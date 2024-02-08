import { Bind, createMethodAnnotation } from '@metafoks/app';

export const TelegramMessageHandler = createMethodAnnotation((target, propertyKey, descriptor) => {
    Bind('telegramMessageHandler')(target, propertyKey, descriptor);
});

export const TelegramCommandHandler = createMethodAnnotation((target, propertyKey, descriptor) => {
    Bind('telegramCommandHandler')(target, propertyKey, descriptor);
});
