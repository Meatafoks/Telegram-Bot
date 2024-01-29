import { Telegraf } from 'telegraf';
import { ConfigWithTelegram } from '../config';
import { LoggerFactory } from '@metafoks/app';

/**
 * Loads telegraf context
 * @param props
 */
export default function (props: { config: ConfigWithTelegram }) {
    const logger = LoggerFactory.createLoggerByName('TelegrafLoader');
    logger.info(`telegraf loaded with token=${props.config.telegramBot.token.substring(0, 3) + '***'}`);
    return new Telegraf(props.config.telegramBot.token);
}
