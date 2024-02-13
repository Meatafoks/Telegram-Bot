import { ExtensionFactory } from '@metafoks/app';
import telegramLoader from './loaders/telegram.loader';
import telegrafLoader from './loaders/telegraf.loader';
import getChatLoader from './loaders/getChat.loader';
import { BotComponent } from './components';
import { TelegramDeliveryService } from './services';
import { TelegrafMock } from './testing';

export const telegramBotExtension = ExtensionFactory.create({
    manifest: {
        identifier: 'org.metafoks.extension.TelegramBot',
    },
    install: context => {
        // Loaders
        context.addFunction('telegram', telegramLoader);
        context.addFunction('telegraf', telegrafLoader);
        context.addFunction('getChat', getChatLoader);

        // Components
        context.addClass('telegramDeliveryService', TelegramDeliveryService);
        context.addClass('bot', BotComponent);
    },
    autorun: async context => {
        await context.resolve<BotComponent>('bot').start();
    },
});

export const telegramBotMockExtension = ExtensionFactory.create({
    manifest: {
        identifier: 'org.metafoks.extension.TelegramBot.Mock',
    },
    install: context => {
        telegramBotExtension.install?.(context);
        context.addMock('telegraf', new TelegrafMock());
    },
});
