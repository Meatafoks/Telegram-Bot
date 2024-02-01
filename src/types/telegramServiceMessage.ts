import * as tg from 'telegraf/typings/core/types/typegram';

export type TelegramServiceMessage =
    | tg.Message.NewChatMembersMessage
    | tg.Message.LeftChatMemberMessage
    | tg.Message.NewChatTitleMessage
    | tg.Message.NewChatPhotoMessage
    | tg.Message.DeleteChatPhotoMessage
    | tg.Message.GroupChatCreatedMessage
    | tg.Message.SupergroupChatCreated
    | tg.Message.ChannelChatCreatedMessage
    | tg.Message.MessageAutoDeleteTimerChangedMessage
    | tg.Message.MigrateToChatIdMessage
    | tg.Message.MigrateFromChatIdMessage
    | tg.Message.PinnedMessageMessage
    | tg.Message.InvoiceMessage
    | tg.Message.SuccessfulPaymentMessage
    | tg.Message.UserSharedMessage
    | tg.Message.ChatSharedMessage
    | tg.Message.ConnectedWebsiteMessage
    | tg.Message.WriteAccessAllowedMessage
    | tg.Message.PassportDataMessage
    | tg.Message.ProximityAlertTriggeredMessage
    | tg.Message.ForumTopicCreatedMessage
    | tg.Message.ForumTopicEditedMessage
    | tg.Message.ForumTopicClosedMessage
    | tg.Message.ForumTopicReopenedMessage
    | tg.Message.GeneralForumTopicHiddenMessage
    | tg.Message.GeneralForumTopicUnhiddenMessage
    | tg.Message.VideoChatScheduledMessage
    | tg.Message.VideoChatStartedMessage
    | tg.Message.VideoChatEndedMessage
    | tg.Message.VideoChatParticipantsInvitedMessage
    | tg.Message.WebAppDataMessage;