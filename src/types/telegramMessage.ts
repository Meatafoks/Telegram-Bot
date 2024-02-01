import * as tg from 'telegraf/typings/core/types/typegram';
import { TelegramServiceMessage } from './telegramServiceMessage';
import { TelegramCommonMessage } from './telegramCommonMessage';

export type TelegramMessage = tg.Message | TelegramServiceMessage | TelegramCommonMessage;