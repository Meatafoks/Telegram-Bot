import { Chat } from '../components';

import { TelegramContextUpdate } from '../types';

export interface CommandEvent {
    context: TelegramContextUpdate;
    chatId: string;
    chat: Chat;
    command: string;
}
