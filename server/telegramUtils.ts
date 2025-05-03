import TelegramBot from "node-telegram-bot-api";

const { telegramLogBotToken, telegramLogChatId } = useRuntimeConfig();

const telegramLogBot = new TelegramBot(telegramLogBotToken, { polling: false });

telegramLogBot.logMessage = async (message: string) => {
    await telegramLogBot.sendMessage(telegramLogChatId, message);
};

export {
    telegramLogBot
};