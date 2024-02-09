export function chunk<T>(array: T[], size: number): T[][] {
    if (size <= 0) {
        throw new Error('Size should be a positive number');
    }

    const chunks: T[][] = [];
    let index = 0;

    while (index < array.length) {
        chunks.push(array.slice(index, index + size));
        index += size;
    }

    return chunks;
}
