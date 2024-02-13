import {
    Binding,
    Component,
    MetafoksApplicationWithProperties,
    Mock,
    runMetafoksApplication,
    TestingApplication,
    With,
} from '@metafoks/app';
import {
    CommandEvent,
    MessageEvent,
    telegramBotExtension,
    TelegramMessageType,
    TelegramCommandHandler,
    TelegramMessageHandler,
    telegramBotMockExtension,
} from '../src';
import { TelegrafMock } from '../src/testing';

describe('test annotations', () => {
    const messageFn = jest.fn();
    const commandFn = jest.fn();

    @Component('configuration')
    class Configuration {
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

    @With(telegramBotExtension, telegramBotMockExtension)
    @Binding(Configuration)
    @TestingApplication
    @MetafoksApplicationWithProperties({ scanner: { enabled: false } })
    class App {}

    it('should run on message on method', async () => {
        const container = await runMetafoksApplication(App);
        const telegraf = container.context.resolve<TelegrafMock>('telegraf');

        // when
        telegraf.pushMessage('hello!');
        telegraf.pushCommand('start');

        // then
        expect(messageFn).toHaveBeenCalledWith('hello!');
        expect(commandFn).toHaveBeenCalledWith('start');
    });
});
