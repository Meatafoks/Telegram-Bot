import { InlineConfig, MetafoksApplication, MetafoksContext } from '@metafoks/app';
import { BotComponent, ConfigWithTelegram, telegramBotExtension } from '../index';
import TelegramCommandHandlerComponent from './telegramCommandHandler.component';
import TelegramMessageHandlerComponent from './telegramMessageHandler.component';

@MetafoksApplication({
    with: [telegramBotExtension, registerTestComponents],
})
@InlineConfig<ConfigWithTelegram>({
    telegramBot: {
        token: process.env.TOKEN!,
        allowSendStartMessage: true,
        supportedCommands: ['a', 'b'],
    },
    metafoks: {
        scanner: {
            service: 'noop.ts',
            loader: 'noop.ts',
            component: 'noop.ts',
        },
        logger: {
            level: {
                app: 'DEBUG',
            },
        },
    },
})
export class TestApplication {
    public constructor(private deps: { bot: BotComponent }) {}

    public async start() {
        await this.deps.bot.start();
    }
}

function registerTestComponents(context: MetafoksContext) {
    context.addClass('telegramCommandHandler', TelegramCommandHandlerComponent);
    context.addClass('telegramMessageHandler', TelegramMessageHandlerComponent);
}
