import TelegramBot from 'node-telegram-bot-api';

const { telegramLogBotToken, telegramLogChatId } = useRuntimeConfig();

type TelegramLogBot = TelegramBot & {
  logMessage: (message: string) => Promise<void>;
};

const telegramLogBot = new TelegramBot(telegramLogBotToken, { polling: false }) as TelegramLogBot;

telegramLogBot.logMessage = async (message: string) => {
  await telegramLogBot.sendMessage(telegramLogChatId, message);
};

export { telegramLogBot };
