import * as tg from 'telegraf/typings/core/types/typegram';

import { TelegramMessage } from './telegramMessage';

/**
 * Telegram message type checker
 */
export const TelegramMessageType = {
    isTextMessage(message: TelegramMessage): message is tg.Message.TextMessage {
        return 'text' in message;
    },
    isVoiceMessage(message: TelegramMessage): message is tg.Message.VoiceMessage {
        return 'voice' in message;
    },
    isDocumentMessage(message: TelegramMessage): message is tg.Message.DocumentMessage {
        return 'document' in message;
    },
    isAnimationMessage(message: TelegramMessage): message is tg.Message.AnimationMessage {
        return 'animation' in message;
    },
    isAudioMessage(message: TelegramMessage): message is tg.Message.AudioMessage {
        return 'audio' in message;
    },
    isContactMessage(message: TelegramMessage): message is tg.Message.ContactMessage {
        return 'contact' in message;
    },
    isDiceMessage(message: TelegramMessage): message is tg.Message.DiceMessage {
        return 'dice' in message;
    },
    isGameMessage(message: TelegramMessage): message is tg.Message.GameMessage {
        return 'game' in message;
    },
    isPhotoMessage(message: TelegramMessage): message is tg.Message.PhotoMessage {
        return 'photo' in message;
    },
    isStickerMessage(message: TelegramMessage): message is tg.Message.StickerMessage {
        return 'sticker' in message;
    },
    isStoryMessage(message: TelegramMessage): message is tg.Message.StoryMessage {
        return 'story' in message;
    },
    isVideoMessage(message: TelegramMessage): message is tg.Message.VideoMessage {
        return 'video' in message;
    },
};
