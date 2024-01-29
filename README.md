# Telegram Bot

Metafoks application extension

## How to use

Install package

```shell
npm i @metafoks/telegram-bot
```

Add configuration to your `config/config.json` file:

```json
{
  "telegramBot": {
    "token": "botFatherToken"
  }
}
```

Install extension to your Metafoks Application

```typescript
import { MetafoksApplication } from "@metafoks/app";
import { telegramBotExtension, BotComponent } from "@metafoks/telegram-bot";

@MetafoksApplication( {
    with: [telegramBotExtension]
} )
class Application {
    constructor(private deps: { bot: BotComponent }) {}

    start() {
        this.deps.bot.start();
    }
}
```

Now your bot is started!

## Handling messages

Create new component:

```typescript
import { Component } from "@metafoks/app";
import { TelegramMessageHandler } from "@metafoks/telegram-bot";

@Component( "telegramMessageHandler" )
export default class TelegramMessageHandlerComponent implements TelegramMessageHandler {
    onMessage(event: NewMessageEvent) {
        event.chat.sendMessage( "Hi!" );
    }
}
```

## Handling commands

First you should set supported comments in config

```json
{
  "telegramBot": {
    "token": "botFatherToken",
    "supportedCommands": [
      "hello"
    ]
  }
}
```

Then you need to create command handler:

```typescript
import { Component } from "@metafoks/app";
import { TelegramCommandHandler } from "@metafoks/telegram-bot";

@Component( "telegramCommandHandler" )
export default class TelegramMessageHandlerComponent implements TelegramCommandHandler {
    onCommand(event: NewCommandEvent) {
        if(event.command === "hello") {
            event.chat.sendMessage( "Hi!" );
        }
    }
}
```