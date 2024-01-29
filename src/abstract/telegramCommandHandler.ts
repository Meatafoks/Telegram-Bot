import { NewCommandEvent } from '../events';

export interface TelegramCommandHandler {
    onCommand(event: NewCommandEvent): Promise<void>;
}
