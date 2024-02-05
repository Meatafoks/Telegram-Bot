export function telegrafMock() {
    const commandMock = jest.fn();

    jest.mock('telegraf', () => ({
        Telegraf: class {
            launch() {
                return new Promise(resolve => {
                    setTimeout(resolve, 1000000);
                });
            }
            command = commandMock;
            on = jest.fn();
        },
    }));

    return { commandMock };
}
