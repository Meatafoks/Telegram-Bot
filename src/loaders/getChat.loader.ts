import { Telegram } from 'telegraf';
import { Chat } from '../components/chat';

/**
 * Get chat function loader
 * @param props
 */
export default function (props: { telegram: Telegram }) {
    const { telegram } = props;

    return (telegramId: string | number) => {
        return Chat.chat({ chatId: String(telegramId), telegram });
    };
}

export type ChatLoader = (telegramId: string | number) => Chat;
