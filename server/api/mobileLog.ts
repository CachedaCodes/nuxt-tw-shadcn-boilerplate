import { telegramLogBot } from "../telegramUtils";
import { z } from "zod";

const mobileLogSchema = z.object({
    message: z.string({
        required_error: "Message is required"
    }).min(1, "Message cannot be empty"),
    level: z.string({
        required_error: "Level is required"
    }).min(1, "Level cannot be empty")
});

type MobileLogBody = z.infer<typeof mobileLogSchema>;

export default defineEventHandler(async (event) => {
    const body = await readBody<MobileLogBody>(event);
    
    try {
        const { message, level } = mobileLogSchema.parse(body);
        const levelUpper = level.toUpperCase();
        const fullMessage = levelUpper === 'LOG' ? message : `[${level.toUpperCase()}] ${message}`;
        await telegramLogBot.logMessage(fullMessage);
        return { success: true, message: "Mobile log successful." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid input. ${error.errors.map((e) => e.message).join("; ")}`,
                data: error.errors
            });
        }
        
        customLogger.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to create mobile log."
        });
    }
});