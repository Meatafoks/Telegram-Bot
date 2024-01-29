export interface TelegramBotConfig {
    token: string;
    creatorId?: string;
    startMessageSend?: boolean;
    supportedCommands?: string[];
}

export interface ConfigWithTelegram {
    telegramBot: TelegramBotConfig;
}
