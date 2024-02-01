import { MetafoksAbstractApplication, MetafoksContext } from '@metafoks/app';
import { ConfigWithTelegram, telegramBotExtension } from '../src';
import { telegrafMock } from './telegraf.mock';

telegrafMock();

describe('test extension', () => {
    let app!: MetafoksAbstractApplication;
    let done = jest.fn(() => console.log('done function'));

    beforeAll(async () => {
        const telegramMessageHandlerMock = (context: MetafoksContext) => {
            context.addValue('telegramMessageHandler', {
                onMessage: jest.fn(),
            });
        };

        app = await MetafoksAbstractApplication.createInstant<ConfigWithTelegram>({
            config: {
                telegramBot: {
                    token: '123',
                },
            },
            with: [telegramMessageHandlerMock, telegramBotExtension, done],
        });
    });

    it('should works', () => {
        expect(!!app.resolve('bot')).toBeTruthy();
        expect(done).toHaveBeenCalledTimes(1);
    });
});
