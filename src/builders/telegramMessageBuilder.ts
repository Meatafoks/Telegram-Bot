import { KeyboardButton } from '../types';

/**
 * Sticker into telegram message builder
 */
export interface StickerItem {
    fileId: string;
    position?: 'before' | 'after';
}

/**
 * Telegram message builder for TelegramDeliveryService
 */
export class TelegramMessageBuilder {
    public static create() {
        return new TelegramMessageBuilder();
    }

    private readonly voices: Buffer[] = [];
    private readonly stickers: StickerItem[] = [];
    private readonly texts: string[] = [];
    private readonly buttons: KeyboardButton[] = [];

    private readonly messagesIdsToDelete: number[] = [];

    protected constructor() {}

    /**
     * Adds another builder values to this builder
     *
     * @Example
     * const builder = TelegramMessageBuilder.create();
     * builder.addText('Hello');
     *
     * const anotherBuilder = TelegramMessageBuilder.create();
     * anotherBuilder.addText('World');
     *
     * builder.add( anotherBuilder );
     * builder.getTexts(); // [ 'Hello', 'World' ]
     *
     * @param anotherBuilder
     */
    public add(anotherBuilder: TelegramMessageBuilder) {
        this.addVoice(...anotherBuilder.getVoices());
        this.addSticker(...anotherBuilder.getStickers());
        this.addText(...anotherBuilder.getTexts());
        this.addButton(...anotherBuilder.getButtons());
        this.addMessageIdToDelete(...anotherBuilder.getMessageIdsToDelete());
        return this;
    }

    public addSticker(...item: StickerItem[]) {
        this.stickers.push(...item);
        return this;
    }

    public addStickerAfterText(...fileId: string[]) {
        return this.addSticker(...fileId.map<StickerItem>(value => ({ fileId: value, position: 'after' })));
    }

    public addStickerBuilderText(...fileId: string[]) {
        return this.addSticker(...fileId.map<StickerItem>(value => ({ fileId: value, position: 'before' })));
    }

    public addMessageIdToDelete(...messageId: number[]) {
        this.messagesIdsToDelete.push(...messageId);
        return this;
    }

    public addText(...message: string[]) {
        this.texts.push(...message);
        return this;
    }

    public addButton(...button: KeyboardButton[]) {
        this.buttons.push(...button);
        return this;
    }

    public addTextButtons(...text: string[]) {
        return this.addButton(...text.map(v => ({ text: v })));
    }

    public addVoice(...voice: Buffer[]) {
        this.voices.push(...voice);
        return this;
    }

    public getTexts() {
        return this.texts;
    }

    public getButtons() {
        return this.buttons;
    }

    public getMessageIdsToDelete() {
        return this.messagesIdsToDelete;
    }

    public getStickers() {
        return this.stickers;
    }

    public getStickersAfterText() {
        return this.getStickers().filter(v => v.position === 'after');
    }

    public getStickersBeforeText() {
        return this.getStickers().filter(v => v.position === 'before');
    }

    public getVoices() {
        return this.voices;
    }
}
