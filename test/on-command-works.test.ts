import { createAbstractApplication, MetafoksAbstractApplication, MetafoksContext } from '@metafoks/app';
import { BotComponent, ConfigWithTelegram, telegramBotExtension } from '../src';

describe('on command feature works', () => {
    let app!: MetafoksAbstractApplication;

    const commandMock = jest.fn();
    const launchMock = jest.fn();

    it('should work without command handler', () => {
        // given
        const app = createAbstractApplication<ConfigWithTelegram>({
            with: [telegramBotExtension],
            config: { overrides: { telegramBot: { autorun: false, token: '123' } } },
        });

        // when
        const bot = app.resolve<BotComponent>('bot');
        bot.startCommandsHandling();

        // then
        // ?
    });
});
