import { Telegram } from 'telegraf';
import { createLogger } from '@metafoks/app';

export class Chat {
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
     * Отправляет статус "набирает сообщение"
     */
    public async sendTyping() {
        const { telegram, chatId } = this.deps;
        const diff = new Date().getTime() - this.lastTypingSend;
        if (diff > 2500) {
            this.lastTypingSend = new Date().getTime();
            await telegram.sendChatAction(chatId, 'typing');
        }
    }

    /**
     * Отправляет статус "набирает сообщение"
     */
    public async sendVoicing() {
        const { telegram, chatId } = this.deps;
        const diff = new Date().getTime() - this.lastTypingSend;
        if (diff > 2500) {
            this.lastTypingSend = new Date().getTime();
            await telegram.sendChatAction(chatId, 'record_voice');
        }
    }

    /**
     * Отправляет сообщение в markdown разметке
     * @param message
     */
    public async sendMarkdownMessage(message: string) {
        const { telegram, chatId } = this.deps;
        await telegram.sendMessage(chatId, {
            parse_mode: 'markdown',
            text: message,
        } as any);
    }

    public async sendRawTextMessage(message: string) {
        const { telegram, chatId } = this.deps;
        await telegram.sendMessage(chatId, message);
    }

    /**
     * Отправляет сообщение в чат
     * @param message
     */
    public async sendMessage(message: string) {
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
                await this.sendRawTextMessage(message);
            } else {
                // Иначе выбрасываем исключение в retryer
                throw e;
            }
        }

        this.logger.info(`sent message to chat ${chatId}`);
    }

    /**
     * Отправляет голосовое сообщение в чат
     * @param message
     */
    public async sendVoice(message: ArrayBuffer) {
        const { telegram, chatId } = this.deps;

        await telegram.sendVoice(chatId, { source: Buffer.from(message) });
        this.logger.info(`sent voice to chat=${chatId}`);
    }
}
