import { telegramLogBot } from "../telegramUtils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.message || !body.level) {
        throw createError({
            statusCode: 400,
            statusMessage: "Both 'message' and 'level' are required in the request body."
        });
    }

    const { message, level } = body;

    try {
        const levelUpper = level.toUpperCase();
        const fullMessage = levelUpper === 'LOG' ? message : `[${level.toUpperCase()}] ${message}`;
        await telegramLogBot.logMessage(fullMessage);
        return { success: true, message: "Mobile log successful." };
    } catch (error) {
        customLogger.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to create mobile log."
        });
    }
});