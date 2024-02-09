import { Chat } from '../src';

export const mockPromise: any = async () => {
    return jest.fn();
};

export const createChatMock = (mocks: Partial<Record<keyof Chat, any>> = {}) => {
    return {
        sendMessage: mockPromise,
        sendSticker: mockPromise,
        lastTypingSend: 0,
        chatId: '',
        forwardMessage: mockPromise,
        sendAction: mockPromise,
        sendPhoto: mockPromise,
        sendDocument: mockPromise,
        sendPoll: mockPromise,
        sendVoice: mockPromise,
        sendVoiceFromArrayBuffer: mockPromise,
        sendActionThrottled: mockPromise,
        sendTypingActionThrottled: mockPromise,
        sendDocumentUploadingActionThrottled: mockPromise,
        sendPhotoUploadingActionThrottled: mockPromise,
        sendVoicingActionThrottled: mockPromise,
        deleteMessage: mockPromise,
        sendMarkdownMessage: mockPromise,
        sendRawTextMessage: mockPromise,
        ...(mocks as any),
    } as any as Chat;
};
