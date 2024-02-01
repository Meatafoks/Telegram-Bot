export function telegrafMock() {
    jest.mock('telegraf', () => ({
        Telegraf: class {
            launch() {
                return new Promise(resolve => {
                    setTimeout(resolve, 1000000);
                });
            }

            on = jest.fn();
        },
    }));
}
