import { Bind } from '@metafoks/app';

export const TelegramMessageHandler = (target: any, propertyKey: string, descriptor: any) => {
    Bind('telegramMessageHandler')(target, propertyKey, descriptor);
};

export const TelegramCommandHandler = (target: any, propertyKey: string, descriptor: any) => {
    Bind('telegramCommandHandler')(target, propertyKey, descriptor);
};
