import { Chat } from '../components';
import { TelegramMessageBuilder } from '../builders/telegramMessageBuilder';

export interface TelegramDeliveryInterface {
    send(chat: Chat, builder: TelegramMessageBuilder): Promise<void>;
}
