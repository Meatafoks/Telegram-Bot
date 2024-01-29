import * as tg from 'telegraf/typings/core/types/typegram';
import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export type TelegramMessage = tg.Message;
export type TelegramContextUpdate = Context<Update>;
