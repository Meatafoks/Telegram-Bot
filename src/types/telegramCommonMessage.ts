import * as tg from 'telegraf/typings/core/types/typegram';

export type TelegramTextMessage = tg.Message.TextMessage;
export type TelegramVoiceMessage = tg.Message.VoiceMessage;
export type TelegramPhotoMessage = tg.Message.PhotoMessage;
export type TelegramStickerMessage = tg.Message.StickerMessage;
export type TelegramDocumentMessage = tg.Message.DocumentMessage;
export type TelegramDiceMessage = tg.Message.DiceMessage;
export type TelegramGameMessage = tg.Message.GameMessage;
export type TelegramPollMessage = tg.Message.PollMessage;

export type TelegramCommonMessage =
    | tg.Message.AnimationMessage
    | tg.Message.AudioMessage
    | tg.Message.ContactMessage
    | TelegramDiceMessage
    | TelegramDocumentMessage
    | TelegramGameMessage
    | tg.Message.LocationMessage
    | TelegramPhotoMessage
    | TelegramPollMessage
    | TelegramStickerMessage
    | tg.Message.StoryMessage
    | TelegramTextMessage
    | tg.Message.VenueMessage
    | tg.Message.VideoMessage
    | tg.Message.VideoNoteMessage
    | TelegramVoiceMessage;
