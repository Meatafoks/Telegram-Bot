export interface TelegramBotConfig {
    token: string;
    creatorId?: string;
    allowSendStartMessage?: boolean;
    supportedCommands?: string[];
}

export interface ConfigWithTelegram {
    telegramBot: TelegramBotConfig;
}
