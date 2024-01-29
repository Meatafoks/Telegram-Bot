import { NewCommandEvent, TelegramCommandHandler } from '../';
import { Component } from '@metafoks/app';

@Component('telegramCommandHandler')
export default class TelegramCommandHandlerComponent implements TelegramCommandHandler {
    async onCommand(event: NewCommandEvent): Promise<void> {
        if (event.command === '/a') {
            await event.chat.sendMessage('Sent a');
        }
        if (event.command === 'b') {
            await event.chat.sendMessage('Sent b');
        }
    }
}
