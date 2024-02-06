import { createAbstractApplication } from '@metafoks/app';
import { telegramBotExtension } from '../src';

describe('test extension', () => {
    it('should works', async () => {
        const loadedFn = jest.fn();
        const app = await createAbstractApplication({
            events: { extensionLoaded: loadedFn },
            extensions: [telegramBotExtension],
            mocks: {
                telegramMessageHandler: {
                    onMessage: jest.fn(),
                },
                telegraf: { on: jest.fn(), launch: async () => ({ result: 'ok' }) },
            },
        });

        expect(app.getContext().has('bot')).toBeTruthy();
        expect(loadedFn).toHaveBeenCalledWith('ru.metafoks.extension.TelegramBot');
    });
});
