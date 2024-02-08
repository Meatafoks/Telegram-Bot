import { containerOf, MetafoksTestingApplication, With } from '@metafoks/app';
import {
    CommandEvent,
    MessageEvent,
    telegramBotExtension,
    TelegramMessageType,
    TelegramCommandHandler,
    TelegramMessageHandler,
} from '../src';
import { TelegrafMock } from '../src/testing';

describe('test annotations', () => {
    const messageFn = jest.fn();
    const commandFn = jest.fn();

    const telegraf = new TelegrafMock();

    @MetafoksTestingApplication({ mocks: { telegraf } })
    @With(telegramBotExtension)
    class App {
        @TelegramMessageHandler
        async messageHandler(event: MessageEvent) {
            if (TelegramMessageType.isTextMessage(event.message)) {
                messageFn(event.message.text);
            }
        }

        @TelegramCommandHandler
        async commandHandler(event: CommandEvent) {
            commandFn(event.command);
        }
    }

    it('should run on message on method', async () => {
        const container = await containerOf(App);

        // when
        telegraf.pushMessage('hello!');
        telegraf.pushCommand('start');

        // then
        expect(messageFn).toHaveBeenCalledWith('hello!');
        expect(commandFn).toHaveBeenCalledWith('start');
    });
});
