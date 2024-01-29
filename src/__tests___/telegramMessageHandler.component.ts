import { NewMessageEvent, TelegramMessageHandler } from '../';
import { Component } from '@metafoks/app';

@Component('telegramMessageHandler')
export default class TelegramMessageHandlerComponent implements TelegramMessageHandler {
    async onMessage(event: NewMessageEvent): Promise<void> {
        await event.chat.sendMessage('Hi');
    }
}
