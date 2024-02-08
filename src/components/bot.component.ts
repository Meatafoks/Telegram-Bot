import { createLogger, Reflection } from '@metafoks/app';
import { Telegraf } from 'telegraf';
import { ChatLoader } from '../loaders';
import { ConfigWithTelegram } from '../config';
import {
    ITelegramCommandHandler,
    ITelegramMessageHandler,
    ITelegramMessageHandlerBinding,
    ITelegramCommandHandlerBinding,
} from '../abstract';

import { TelegramFile } from '../types';
import { MessageEvent } from '../events';

export class BotComponent {
    private logger = createLogger(BotComponent);

    public constructor(
        private deps: {
            config: ConfigWithTelegram;
            telegraf: Telegraf;
            telegramMessageHandler: ITelegramMessageHandler | ITelegramMessageHandlerBinding;
            telegramCommandHandler: ITelegramCommandHandler | ITelegramCommandHandlerBinding;
            getChat: ChatLoader;
            reflection: Reflection;
        },
    ) {}

    /**
     * Starts messages handling
     */
    startMessageHandling() {
        const { telegraf, getChat } = this.deps;

        if (!this.deps.reflection.has('telegramMessageHandler')) {
            this.logger.error('component or binding `telegramMessageHandler` is undefined!');
            return;
        }

        const { telegramMessageHandler } = this.deps;

        telegraf.on('message', async context => {
            const { chat, message } = context;

            if (chat) {
                const instance = getChat(chat.id);
                this.logger.debug(`on received message from chatId=${instance.chatId}`);
                const event = { context, chat: instance, message, chatId: instance.chatId };

                if (typeof telegramMessageHandler === 'function') {
                    await telegramMessageHandler(event);
                } else {
                    await telegramMessageHandler.onMessage(event);
                }
            } else {
                this.logger.warn('chat not found in context');
                this.logger.trace(JSON.stringify(context));
            }
        });

        this.logger.info('message handling started');
    }

    /**
     * Starts commands handling
     */
    startCommandsHandling() {
        const { telegraf, getChat, config, reflection } = this.deps;
        const { telegramBot } = config;

        if ((telegramBot.supportedCommands ?? []).length > 0) {
            if (!reflection.has('telegramCommandHandler')) {
                this.logger.error('component `telegramCommandHandler` not found');
                return;
            }

            const telegramCommandHandler = this.deps.telegramCommandHandler;

            for (const command of telegramBot.supportedCommands ?? []) {
                this.logger.debug(`registering command=${command} handler`);
                telegraf.command(command, async context => {
                    const { chat } = context;
                    if (chat) {
                        const instance = getChat(chat.id);
                        this.logger.debug(`on received command=${command} from chatId=${instance.chatId}`);
                        const event = { context, chat: instance, chatId: instance.chatId, command };
                        if (typeof telegramCommandHandler === 'function') {
                            await telegramCommandHandler(event);
                        } else {
                            await telegramCommandHandler.onCommand(event);
                        }
                    } else {
                        this.logger.warn('chat not found in command context');
                        this.logger.trace(JSON.stringify(context));
                    }
                });
            }

            this.logger.info('commands handling started');
        }
    }

    public async start() {
        const { telegraf } = this.deps;

        this.startCommandsHandling();
        this.startMessageHandling();

        // Enable graceful stop
        process.once('SIGINT', () => {
            this.logger.debug('stopping bot by SIGINT');

            telegraf.stop('SIGINT');
            this.logger.info('bot stopped by SIGINT');
        });
        process.once('SIGTERM', () => {
            this.logger.debug('stopping bot by SIGTERM');

            telegraf.stop('SIGTERM');
            this.logger.info('bot stopped by SIGTERM');
        });

        telegraf.launch().catch(reason => {
            throw reason;
        });

        this.logger.info('telegraf started');
        if (this.deps.config.telegramBot.allowSendStartMessage !== false) {
            if (this.deps.config.telegramBot.creatorId) {
                const chat = this.deps.getChat(this.deps.config.telegramBot.creatorId);
                await chat.sendMessage('Бот успешно запущен и готов к работе');
            }
        }
    }

    public async getFile(fileId: string): Promise<TelegramFile> {
        return this.deps.telegraf.telegram.getFile(fileId);
    }

    public async getFileLink(fileId: string | TelegramFile): Promise<URL> {
        return this.deps.telegraf.telegram.getFileLink(fileId);
    }
}
