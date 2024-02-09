import { TelegramMessageBuilder } from 'builders/telegramMessageBuilder';
import { Chat } from 'components';
import { TelegramDeliveryInterface } from './telegramDelivery.interface';
import { KeyboardButton } from '../types/telegram';
import { chunk } from '../utils';
import { createLogger } from '@metafoks/app';
import { TelegramMessage } from '../types';

export type DeleteDefinerFn = (message: TelegramMessage, chat: Chat) => Promise<boolean>;

export class TelegramDeliveryService implements TelegramDeliveryInterface {
    private readonly logger = createLogger(TelegramDeliveryService);

    private readonly messageToDeleteDefiners = new Set<DeleteDefinerFn>();
    private plannedDeleteIds: Record<string, number[]> = {};

    private keyboardColumnsCount = 2;

    async send(chat: Chat, builder: TelegramMessageBuilder): Promise<void> {
        this.logger.debug(`sending new message to chat=${chat.chatId}`);
        this.logger.trace(JSON.stringify(builder));

        await this.deleteMessagesByPlan(chat);
        await this.deleteMessages(chat, builder.getMessageIdsToDelete());
        await this.sendStickersBeforeAll(chat, builder);
        await this.sendTextMessages(chat, builder.getTexts(), builder.getButtons());
        await this.sendVoices(chat, builder.getVoices());
        await this.sendStickersAfterAll(chat, builder);
    }

    private async sendVoices(chat: Chat, voices?: Buffer[]) {
        if (voices && voices.length > 0) {
            this.logger.debug(`sending voices to chat=${chat.chatId}`);
            for (const voice of voices) {
                await chat.sendVoice({ source: voice });
            }

            this.logger.info(`sent voices to chat=${chat.chatId}`);
        }
    }

    private async sendStickersBeforeAll(chat: Chat, builder: TelegramMessageBuilder) {
        await this.sendStickers(
            chat,
            builder.getStickersBeforeText().map(it => it.fileId),
        );
    }

    private async sendStickersAfterAll(chat: Chat, builder: TelegramMessageBuilder) {
        await this.sendStickers(
            chat,
            builder.getStickersAfterText().map(it => it.fileId),
        );
    }

    private async sendStickers(chat: Chat, stickers: string[]) {
        if (stickers && stickers.length > 0) {
            this.logger.debug(`sending stickers to chat=${chat.chatId}`);
            this.logger.trace(JSON.stringify(stickers));

            for (const sticker of stickers) {
                await chat.sendSticker(sticker);
            }

            this.logger.info(`sent stickers to chat=${chat.chatId}`);
        }
    }

    private async deleteMessagesByPlan(chat: Chat) {
        if (this.plannedDeleteIds[chat.chatId] && this.plannedDeleteIds[chat.chatId].length > 0) {
            this.logger.debug(`deleting messages in chat=${chat.chatId}`);

            await this.deleteMessages(chat, this.plannedDeleteIds[chat.chatId]);
            this.plannedDeleteIds[chat.chatId] = [];

            this.logger.info(`deleted messages in chat=${chat.chatId}`);
        }
    }

    private async deleteMessages(chat: Chat, messageIds: number[]) {
        for (const messageId of messageIds) {
            await chat.deleteMessage(messageId);
        }
    }

    public addDeleteDefiner(definer: DeleteDefinerFn) {
        this.messageToDeleteDefiners.add(definer);
        this.logger.info('added delete message definer');
    }

    public setKeyboardColumnsCount(count: number) {
        this.keyboardColumnsCount = count;
        this.logger.info(`set columns count to=${count}`);
    }

    private async isMessageToDelete(message: TelegramMessage, chat: Chat) {
        if (this.messageToDeleteDefiners.size === 0) return;
        for (const definer of this.messageToDeleteDefiners) {
            if (await definer(message, chat)) {
                this.logger.debug(`message delete action will run`);
                return true;
            }
        }
        return false;
    }

    private addMessageIdToDeletePlan(chat: Chat, messageId: number) {
        if (!this.plannedDeleteIds[chat.chatId]) this.plannedDeleteIds[chat.chatId] = [];
        this.plannedDeleteIds[chat.chatId].push(messageId);
    }

    private async sendTextMessages(chat: Chat, messages: string[], buttons?: KeyboardButton[]) {
        for (const message of messages) {
            const result = await chat.sendMessage(message, {
                reply_markup: buttons && { keyboard: chunk(buttons, this.keyboardColumnsCount) },
            });
            if (await this.isMessageToDelete(result, chat)) {
                this.addMessageIdToDeletePlan(chat, result.message_id);
            }
        }
    }
}
