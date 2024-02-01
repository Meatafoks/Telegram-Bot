import * as tg from 'telegraf/typings/core/types/typegram';

export type TelegramCommonMessage =
    | tg.Message.AnimationMessage
    | tg.Message.AudioMessage
    | tg.Message.ContactMessage
    | tg.Message.DiceMessage
    | tg.Message.DocumentMessage
    | tg.Message.GameMessage
    | tg.Message.LocationMessage
    | tg.Message.PhotoMessage
    | tg.Message.PollMessage
    | tg.Message.StickerMessage
    | tg.Message.StoryMessage
    | tg.Message.TextMessage
    | tg.Message.VenueMessage
    | tg.Message.VideoMessage
    | tg.Message.VideoNoteMessage
    | tg.Message.VoiceMessage;