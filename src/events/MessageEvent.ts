import { Chat } from '../components';
import { TelegramMessage, TelegramContextUpdate } from '../types';

export interface MessageEvent {
    context: TelegramContextUpdate;
    chatId: string;
    chat: Chat;
    message: TelegramMessage;
}
