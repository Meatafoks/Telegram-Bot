import { Chat } from '../components/chat';
import { TelegramContextUpdate, TelegramMessage } from '../types';

export interface NewMessageEvent {
    context: TelegramContextUpdate;
    chatId: string;
    chat: Chat;
    message: TelegramMessage;
}
