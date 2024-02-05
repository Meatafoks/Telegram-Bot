import { createAbstractApplication } from '@metafoks/app';
import { telegramBotExtension } from '../src';

jest.mock('telegraf', () => ({
    Telegraf: class {
        launch() {
            return new Promise(resolve => {
                setTimeout(resolve, 1000000);
            });
        }
        on = jest.fn();
    },
}));

describe('test extension', () => {
    const loadedFn = jest.fn();
    const app = createAbstractApplication({
        config: { loaderLoggerLevel: 'trace' },
        events: { onExtensionLoaded: loadedFn },
        with: [telegramBotExtension],
        mocks: {
            telegramMessageHandler: {
                onMessage: jest.fn(),
            },
        },
    });

    it('should works', async () => {
        expect(app.getContext().has('bot')).toBeTruthy();

        await new Promise(resolve => setTimeout(resolve, 2000));
        expect(loadedFn).toHaveBeenCalledWith('ru.metafoks.extension.TelegramBot');
    });
});
