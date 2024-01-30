export interface TelegramBotConfig {
    token: string;
    creatorId?: string;
    allowSendStartMessage?: boolean;
    supportedCommands?: string[];
    autorun?: boolean;
}

export interface ConfigWithTelegram {
    telegramBot: TelegramBotConfig;
}
