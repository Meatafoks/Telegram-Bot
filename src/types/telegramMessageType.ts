import * as tg from 'telegraf/typings/core/types/typegram';

import { TelegramMessage } from './telegramMessage';
import {
    TelegramDiceMessage,
    TelegramDocumentMessage,
    TelegramGameMessage,
    TelegramPhotoMessage,
    TelegramPollMessage,
    TelegramStickerMessage,
    TelegramTextMessage,
    TelegramVoiceMessage,
} from './telegramCommonMessage';

/**
 * Telegram message type checker
 */
export const TelegramMessageType = {
    isTextMessage(message: TelegramMessage): message is TelegramTextMessage {
        return 'text' in message;
    },
    isVoiceMessage(message: TelegramMessage): message is TelegramVoiceMessage {
        return 'voice' in message;
    },
    isDocumentMessage(message: TelegramMessage): message is TelegramDocumentMessage {
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
    isDiceMessage(message: TelegramMessage): message is TelegramDiceMessage {
        return 'dice' in message;
    },
    isGameMessage(message: TelegramMessage): message is TelegramGameMessage {
        return 'game' in message;
    },
    isPhotoMessage(message: TelegramMessage): message is TelegramPhotoMessage {
        return 'photo' in message;
    },
    isStickerMessage(message: TelegramMessage): message is TelegramStickerMessage {
        return 'sticker' in message;
    },
    isStoryMessage(message: TelegramMessage): message is tg.Message.StoryMessage {
        return 'story' in message;
    },
    isVideoMessage(message: TelegramMessage): message is tg.Message.VideoMessage {
        return 'video' in message;
    },
    isPollMessage(message: TelegramMessage): message is TelegramPollMessage {
        return 'poll' in message;
    },
};
