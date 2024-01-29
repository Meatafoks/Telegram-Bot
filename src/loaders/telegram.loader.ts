import { Telegraf } from 'telegraf';

export default function (props: { telegraf: Telegraf }) {
    return props.telegraf.telegram;
}
