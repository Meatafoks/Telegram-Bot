import { NewMessageEvent } from '../events';

/**
 * Chat messages handler
 */
export interface TelegramMessageHandler {
    /**
     * New message event
     * @param event
     */
    onMessage(event: NewMessageEvent): Promise<void>;
}
