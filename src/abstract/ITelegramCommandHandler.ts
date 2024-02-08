import { CommandEvent } from '../events';

export interface ITelegramCommandHandler {
    onCommand(event: CommandEvent): Promise<void>;
}

export type ITelegramCommandHandlerBinding = (event: CommandEvent) => Promise<void>;
