import { createAbstractApplication } from '@metafoks/app';
import { BotComponent, ConfigWithTelegram, telegramBotExtension } from '../src';

describe('on command feature works', () => {
    const commandMock = jest.fn();

    it('should work without command handler', async () => {
        // given
        const app = await createAbstractApplication<ConfigWithTelegram>({
            extensions: [telegramBotExtension],
            mocks: {
                telegramMessageHandler: { onMessage: () => null },
                telegramCommandHandler: { onCommand: () => null },
                telegraf: {
                    launch: async () => ({ result: 'ok' }),
                    on: jest.fn(),
                    command: commandMock,
                },
            },
        });

        // then
        expect(commandMock).toHaveBeenCalled();
    });
});
