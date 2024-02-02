import * as tg from 'telegraf/typings/core/types/typegram';
import * as tt from 'telegraf/src/telegram-types';

export type TelegramChatAction =
    | 'typing'
    | 'upload_photo'
    | 'record_video'
    | 'upload_video'
    | 'record_voice'
    | 'upload_voice'
    | 'upload_document'
    | 'choose_sticker'
    | 'find_location'
    | 'record_video_note'
    | 'upload_video_note';

export type TelegramPhotoPayload = tg.Opts<'sendPhoto'>['photo'];
export type TelegramPhotoExtraPayload = tt.ExtraPhoto;

export type TelegramVoicePayload = tg.Opts<'sendVoice'>['voice'];
export type TelegramVoiceExtraPayload = tt.ExtraVoice;

export type TelegramDocumentPayload = tg.Opts<'sendDocument'>['document'];
export type TelegramDocumentExtraPayload = tt.ExtraDocument;

export type TelegramStickerPayload = tg.Opts<'sendSticker'>['sticker'];
export type TelegramStickerExtraPayload = tt.ExtraSticker;

export type TelegramPollPayload = { question: string; answers: string[] };
export type TelegramPollExtraPayload = tt.ExtraPoll;
