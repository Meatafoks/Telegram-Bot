import { Chat } from '../components';

import { TelegramContextUpdate } from '../types';

export interface NewCommandEvent {
    context: TelegramContextUpdate;
    chatId: string;
    chat: Chat;
    command: string;
}
