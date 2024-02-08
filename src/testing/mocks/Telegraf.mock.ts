import { TelegramChat, TelegramMessage, TelegramTextMessage } from '../../types';

export interface TelegrafMockUpdate {
    chat: TelegramChat;
    message: TelegramMessage;
}

export interface TelegrafMockCommandUpdate {
    chat: TelegramChat;
    message: TelegramMessage;
}

export type TelegrafMockMessageListener = (update: TelegrafMockUpdate) => void;
export type TelegrafCommandMessageListener = (update: TelegrafMockCommandUpdate) => void;

export function createMockTextMessage(text: string): TelegramTextMessage {
    return { text } as TelegramTextMessage;
}

export function createMockChat(chatId: number = 1): TelegramChat {
    return {
        first_name: 'test',
        type: 'private',
        id: chatId,
    };
}

export class TelegrafMock {
    listeners: Record<string, Set<TelegrafMockMessageListener>> = {};
    commands: Record<string, Set<TelegrafCommandMessageListener>> = {};

    on(event: string, listener: TelegrafMockMessageListener) {
        if (!this.listeners[event]) this.listeners[event] = new Set();
        this.listeners[event].add(listener);
    }

    command(event: string, listener: TelegrafCommandMessageListener) {
        if (!this.commands[event]) this.commands[event] = new Set();
        this.commands[event].add(listener);
    }

    pushMessage(text: string) {
        this.listeners['message']?.forEach(listener =>
            listener({
                chat: createMockChat(1),
                message: createMockTextMessage(text),
            }),
        );
    }

    pushCommand(command: string) {
        this.commands[command]?.forEach(listener =>
            listener({
                chat: createMockChat(1),
                message: createMockTextMessage(command),
            }),
        );
    }

    async launch() {
        return { result: 'ok' };
    }
}
