# Metafoks Telegram Bot

Расширение для Metafoks Application

- [Установка](#установка)
    - [1. Подготовка проекта](#1-подготовка-проекта)
    - [2. Конфигурация](#2-конфигурация)
    - [3. Установка расширения в проект](#3-установка-расширения-в-проект)
    - [4. Регистрация обработчика сообщений](#4-регистрация-обработчика-сообщений)
    - [5. Регистрация обработчика команд](#5-регистрация-обработчика-команд)
- [Конфигурация](#конфигурация)
## Установка

### 1. Подготовка проекта

1. Необходимо установить и настроить проект [Metafoks Application](https://github.com/Meatafoks/Application)
2. Необходимо установить расширение из NPM: `npm i @metafoks/telegram-bot`

### 2. Конфигурация

В файл конфигурации `config/config.json` необходимо добавить следующую информацию:

```json
{
  "telegramBot": {
    "token": "bot_father_token_api"
  }
}
```

Подробнее о том, как получить токен для бота читайте в telegram.

### 3. Установка расширения в проект

Используйте аннотацию `MetafoksApplication`, ее параметр `with`.

```typescript
import { MetafoksApplication } from "@metafoks/app";
import { telegramBotExtension } from "@metafoks/telegram-bot";

@MetafoksApplication( {
    with: [telegramBotExtension]
} )
class Application {
    constructor(private deps: {}) {}

    start() {
        // ...
    }
}
```

### 4. Регистрация обработчика сообщений

Для запуска бота необходимо создать обработчик сообщений: в любом месте в проекте создает
файл `messageHandler.component.ts`.

```typescript
// file: messageHandler.component.ts
// imports...

// telegramMessageHandler - обязательно имя для компонента
@Component( "telegramMessageHandler" )
export default class MessageHandlerComponent implements TelegramMessageHandler {
    onMessage(event: NewMessageEvent) {
        event.chat.sendMessage( "Hi!" );
    }
}
```

После этого можно запустить бота и отправить любое сообщение.

## 5. Регистрация обработчика команд

Сначала необходимо зарегистрировать команды:

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

Далее, в любом месте в проекте создает файл `commandHandler.component.ts`.

```typescript
// file: commandHandler.component.ts
// imports...

// telegramMessageHandler - обязательно имя для компонента
@Component( "telegramCommandHandler" )
export default class CommandHandlerComponent implements TelegramCommandHandler {
    onCommand(event: NewCommandEvent) {
        if (event.command === "hello") {
            event.chat.sendMessage( "Hi!" );
        }
    }
}
```

## Конфигурация
Для конфигурации необходимо создать секцию `telegramBot` в файле `config/config.json`.

```json
{
  "telegramBot": {}
}
```

- token (string) - токен телеграм бота
- supportedCommands (string[]) - список поддерживаемых команд
- creatorId (string?) - ID создателя бота (необходимо для критических сообщений)
- allowSendStartMessage (boolean?) - по умолчанию: true. Если установлено в true, во время запуска бота (или перезапуска) creatorId будет получать сообщение об этом
