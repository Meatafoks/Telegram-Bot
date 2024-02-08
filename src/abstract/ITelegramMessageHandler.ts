import { CommandEvent, MessageEvent } from '../events';

/**
 * Chat messages handler
 */
export interface ITelegramMessageHandler {
    /**
     * New message event
     * @param event
     */
    onMessage(event: MessageEvent): Promise<void>;
}

export type ITelegramMessageHandlerBinding = (event: MessageEvent) => Promise<void>;
