import { MetafoksAbstractApplication, MetafoksContext } from '@metafoks/app';
import { BotComponent, ConfigWithTelegram, telegramBotExtension } from '../src';
import { telegrafMock } from './telegraf.mock';

telegrafMock();

describe('start function should not block application', () => {
    let app!: MetafoksAbstractApplication;
    let done = jest.fn();

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
                    autorun: false,
                },
            },
            with: [telegramMessageHandlerMock, telegramBotExtension],
        });
    });

    it('should works', async () => {
        const bot = app.resolve('bot') as BotComponent;

        await bot.start();
        done();

        expect(done).toHaveBeenCalledTimes(1);
    });
});
