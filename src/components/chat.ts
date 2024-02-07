import { Telegram } from 'telegraf';
import { createLogger } from '@metafoks/app';
import {
    TelegramChatAction,
    TelegramDocumentExtraPayload,
    TelegramDocumentPayload,
    TelegramMessageExtraPayload,
    TelegramPhotoExtraPayload,
    TelegramPhotoPayload,
    TelegramPollExtraPayload,
    TelegramPollPayload,
    TelegramStickerExtraPayload,
    TelegramStickerPayload,
    TelegramVoiceExtraPayload,
    TelegramVoicePayload,
} from '../types';

export class Chat {
    public static CHAT_ACTION_DELAY = 2500;

    private static chats: { [chatId: string]: Chat } = {};

    public static chat(deps: { chatId: string; telegram: Telegram }): Chat {
        const { chatId, telegram } = deps;

        if (!Object.prototype.hasOwnProperty.call(this.chats, chatId)) {
            this.chats[chatId] = new Chat({ chatId, telegram });
        }
        return this.chats[chatId];
    }

    private logger: ReturnType<typeof createLogger>;
    private lastTypingSend = 0;

    private constructor(private deps: { chatId: string; telegram: Telegram }) {
        this.logger = createLogger(`Chat#${deps.chatId}`);
    }

    public get chatId() {
        return this.deps.chatId;
    }

    /**
     * Forwards the message
     * @param props
     */
    public async forwardMessage(props: { fromChatId: number | string; messageId: number }) {
        return await this.deps.telegram.forwardMessage(this.chatId, props.fromChatId, props.messageId);
    }

    public async sendAction(action: TelegramChatAction) {
        this.logger.debug(`sending action=${action}`);
        const result = await this.deps.telegram.sendChatAction(this.chatId, action);

        this.logger.info(`sent action=${action}`);
        return result;
    }

    public async sendPhoto(photo: TelegramPhotoPayload, extra?: TelegramPhotoExtraPayload) {
        this.logger.debug(`sending photo message with extra=${extra}`);
        this.logger.trace(photo);
        const result = await this.deps.telegram.sendPhoto(this.chatId, photo, extra);

        this.logger.info(`sent photo to chat with extra=${extra}`);
        return result;
    }

    public async sendDocument(document: TelegramDocumentPayload, extra?: TelegramDocumentExtraPayload) {
        this.logger.debug(`sending document message with extra=${JSON.stringify(extra)}`);
        this.logger.trace(document);
        const result = await this.deps.telegram.sendDocument(this.chatId, document, extra);

        this.logger.info(`sent document to chat with extra=${JSON.stringify(extra)}`);
        return result;
    }

    public async sendSticker(sticker: TelegramStickerPayload, extra?: TelegramStickerExtraPayload) {
        this.logger.debug(`sending sticker message with extra=${JSON.stringify(extra)}`);
        this.logger.trace(sticker);
        const result = await this.deps.telegram.sendSticker(this.chatId, sticker, extra);

        this.logger.info(`sent sticker to chat with extra=${JSON.stringify(extra)}`);
        return result;
    }

    public async sendPoll(poll: TelegramPollPayload, extra?: TelegramPollExtraPayload) {
        this.logger.debug(`sending poll=${JSON.stringify(poll)} message with extra=${JSON.stringify(extra)}`);
        const result = await this.deps.telegram.sendPoll(this.chatId, poll.question, poll.answers, extra);

        this.logger.info(`sent poll=${JSON.stringify(poll)} message with extra=${JSON.stringify(extra)}`);
        return result;
    }

    public async sendVoice(voice: TelegramVoicePayload, extra?: TelegramVoiceExtraPayload) {
        this.logger.debug(`sending voice message with extra=${extra}`);
        this.logger.trace(voice);
        const result = await this.deps.telegram.sendVoice(this.chatId, voice, extra);

        this.logger.info(`sent voice to chat with extra=${extra}`);
        return result;
    }

    public async sendVoiceFromArrayBuffer(message: ArrayBuffer) {
        return await this.sendVoice({ source: Buffer.from(message) });
    }

    /**
     * Sending an action per 2500 ms. You can simply call it anytime and don't worry about timing
     * @param action
     */
    public async sendActionThrottled(action: TelegramChatAction) {
        const diff = new Date().getTime() - this.lastTypingSend;
        if (diff > Chat.CHAT_ACTION_DELAY) {
            this.lastTypingSend = new Date().getTime();
            return await this.sendAction(action);
        }
        return false;
    }

    /**
     * Sending typing action with throttle
     * @see Chat.sendActionThrottled - about throttle
     */
    public async sendTypingActionThrottled() {
        await this.sendActionThrottled('typing');
    }

    /**
     Sending upload document action with throttle
     @see Chat.sendActionThrottled - about throttle
     */
    public async sendDocumentUploadingActionThrottled() {
        await this.sendActionThrottled('upload_document');
    }

    /**
     Sending upload document action with throttle
     @see Chat.sendActionThrottled - about throttle
     */
    public async sendPhotoUploadingActionThrottled() {
        await this.sendActionThrottled('upload_photo');
    }

    /**
     Sending recording the voice action with throttle
     @see Chat.sendActionThrottled - about throttle
     */
    public async sendVoicingActionThrottled() {
        await this.sendActionThrottled('record_voice');
    }

    /**
     * Отправляет сообщение в markdown разметке
     * @param message
     * @param extra
     */
    public async sendMarkdownMessage(message: string, extra?: TelegramMessageExtraPayload) {
        const { telegram, chatId } = this.deps;
        await telegram.sendMessage(chatId, {
            parse_mode: 'markdown',
            text: message,
            ...(extra ?? {}),
        } as any);
    }

    public async sendRawTextMessage(message: string, extra?: TelegramMessageExtraPayload) {
        const { telegram, chatId } = this.deps;
        await telegram.sendMessage(chatId, message, extra);
    }

    /**
     * Отправляет сообщение в чат
     * @param message
     * @param extra
     */
    public async sendMessage(message: string, extra?: TelegramMessageExtraPayload) {
        const { chatId } = this.deps;

        try {
            this.logger.debug('trying to send message with markdown....');
            // Отправляем маркдаун сообщение
            await this.sendMarkdownMessage(message);
        } catch (e: any) {
            this.logger.warn(`error while sending markdown message to ${chatId}`);

            // Если это ошибка с составлением маркдауна - пробуем отправить чистый текст
            if ('response' in e && e.response && 'error_code' in e.response && e.response.error_code == 400) {
                this.logger.debug(`trying to send raw text message to chat ${chatId}`);
                await this.sendRawTextMessage(message, extra);
            } else {
                // Иначе выбрасываем исключение в retryer
                throw e;
            }
        }

        this.logger.info(`sent message to chat ${chatId}`);
    }
}
