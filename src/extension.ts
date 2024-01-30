import { LoggerFactory, MetafoksContext } from '@metafoks/app';
import telegramLoader from './loaders/telegram.loader';
import telegrafLoader from './loaders/telegraf.loader';
import getChatLoader from './loaders/getChat.loader';
import { BotComponent } from './components';
import { ConfigWithTelegram } from './config';

export async function telegramBotExtension(context: MetafoksContext) {
    const logger = LoggerFactory.createLoggerByName('TelegramBotConnector');
    const config = context.getConfig<ConfigWithTelegram>();

    logger.level = config.metafoks?.logger?.level?.system ?? 'debug';
    logger.debug('connecting telegram bot to Metafoks App Context');

    // Loaders
    context.addFunction('telegram', telegramLoader);
    context.addFunction('telegraf', telegrafLoader);
    context.addFunction('getChat', getChatLoader);

    // Services
    context.addClass('bot', BotComponent);

    if (config.telegramBot.autorun !== false) {
        logger.info('config.telegramBot.autorun enabled by default');
        await context.resolve<BotComponent>('bot').start();
    }

    logger.info('connected telegram bot to Metafoks App Context');
}
