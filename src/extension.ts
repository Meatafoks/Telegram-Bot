import { createExtension } from '@metafoks/app';
import telegramLoader from './loaders/telegram.loader';
import telegrafLoader from './loaders/telegraf.loader';
import getChatLoader from './loaders/getChat.loader';
import { BotComponent } from './components';
import { TelegramDeliveryService } from './services/telegramDelivery.service';

export const telegramBotExtension = createExtension(context => {
    // Loaders
    context.addFunction('telegram', telegramLoader);
    context.addFunction('telegraf', telegrafLoader);
    context.addFunction('getChat', getChatLoader);

    // Components
    context.addClass('telegramDeliveryService', TelegramDeliveryService);
    context.addClass('bot', BotComponent);

    return {
        identifier: 'ru.metafoks.extension.TelegramBot',
        autorun: async () => {
            await context.resolve<BotComponent>('bot').start();
        },
    };
});
