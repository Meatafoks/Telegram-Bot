import { TelegramMessageBuilder, TelegramMessageType, TelegramDeliveryService } from '../src';
import { createChatMock } from './createChatMock';

describe('delivery service test', () => {
    const sendMessageFn = jest.fn((text: string) => ({ text }));
    const deleteFn = jest.fn();
    const sendStickerFn = jest.fn();

    const builder = TelegramMessageBuilder.create()
        .addStickerAfterText('fileAfter')
        .addStickerBuilderText('fileBefore')
        .addText('message')
        .addText('i am to delete');

    const chatMock = createChatMock({
        sendSticker: sendStickerFn,
        sendMessage: sendMessageFn,
        async deleteMessage(messageId: number): Promise<true> {
            deleteFn(messageId);
            return true;
        },
    });

    const service = new TelegramDeliveryService();

    beforeAll(() => {
        service.addDeleteDefiner(async message => {
            if (TelegramMessageType.isTextMessage(message)) {
                if (message.text === 'i am to delete') return true;
            }
            return false;
        });
    });

    it('should works properly', async () => {
        await service.send(chatMock, builder);

        // then
        expect(deleteFn).toHaveBeenCalledTimes(0);

        expect(sendStickerFn).toHaveBeenCalledTimes(2);
        expect(sendMessageFn).toHaveBeenCalledTimes(2);

        expect(sendMessageFn).toHaveBeenCalledWith('message', { reply_markup: { keyboard: [] } });
        expect(sendMessageFn).toHaveBeenCalledWith('i am to delete', { reply_markup: { keyboard: [] } });

        await service.send(chatMock, TelegramMessageBuilder.create());
        expect(deleteFn).toHaveBeenCalledTimes(1);
    });
});
