# Metafoks Telegram Bot

Extension for Metafoks Application

- [Installation](#installation)
    - [1. Project Preparation](#1-project-preparation)
    - [2. Configuration](#2-configuration)
    - [3. Installation of the Extension in the Project](#3-installation-of-the-extension-in-the-project)
    - [4. Registration of Message Handlers](#4-registration-of-message-handlers)
    - [5. Registration of Command Handlers](#5-registration-of-command-handlers)
- [Configuration](#configuration)

## Installation

### 1. Project Preparation

1. You need to install and configure the [Metafoks Application](https://github.com/Meatafoks/Application).
2. Install the extension from NPM: `npm i @metafoks/telegram-bot`.

### 2. Configuration

Add the following information to the config/config.json configuration file:

```json
{
  "telegramBot": {
    "token": "bot_father_token_api"
  }
}
```

For more details on how to obtain a token for the bot, please refer to the Telegram documentation.

### 3. Installation of the Extension in the Project

Use the MetafoksApplication annotation with the with parameter:

```typescript
import { MetafoksApplication, With } from "@metafoks/app";
import { telegramBotExtension } from "@metafoks/telegram-bot";

@MetafoksApplication
@With(telegramBotExtension)
class Application {
    constructor(private deps: {}) {}

    start() {
        // ...
    }

}
```

### 4. Registration of Message Handlers

To run the bot, you need to create a message handler component: create a file called messageHandler.component.ts
anywhere in the project.

```typescript
// file: messageHandler.component.ts
// imports...

// telegramMessageHandler - mandatory name for the component
@Component( "telegramMessageHandler" )
export default class MessageHandlerComponent implements TelegramMessageHandler {
    onMessage(event: MessageEvent) {
        event.chat.sendMessage( "Hi!" );
    }
}
```

Once this is done, you can start the bot and send any message.

## 5. Registration of Command Handlers

First, you need to register the commands:

```json
{
  "telegramBot": {
    "token": "bot_father_token_api",
    "supportedCommands": [
      "hello"
    ]
  }
}
```

Next, create a file called commandHandler.component.ts anywhere in the project.

```typescript
// file: commandHandler.component.ts
// imports...

// telegramCommandHandler - mandatory name for the component
@Component( "telegramCommandHandler" )
export default class CommandHandlerComponent implements TelegramCommandHandler {
    onCommand(event: CommandEvent) {
        if (event.command === "hello") {
            event.chat.sendMessage( "Hi!" );
        }
    }
}
```

## Configuration

To configure the bot, create a telegramBot section in the config/config.json file.

```json
{
  "telegramBot": {}
}
```

- `token` (string) - The token for the Telegram bot
- `supportedCommands` (string) - The list of supported commands
- `creatorId` (string?) - The ID of the bot creator (required for critical messages)
- `allowSendStartMessage` (boolean?) - Default: true. If set to true, the creatorId will receive a message when the bot
  starts or restarts.