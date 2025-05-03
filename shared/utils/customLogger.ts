/**
 * Custom Logger Builder
 * Creates console method-like functions that prefix messages with custom text
 */
type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

/**
 * Type definition for the logger object with methods for different log levels
 */
interface Logger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  telegram: {
    log: (...args: any[]) => Promise<void>;
    warn: (...args: any[]) => Promise<void>;
    error: (...args: any[]) => Promise<void>;
    info: (...args: any[]) => Promise<void>;
    debug: (...args: any[]) => Promise<void>;
  };
}


/**
 * Creates a logger object with methods for different log levels
 * 
 * @param prefix - Text to prepend to all log messages
 * @param telegramConfig - Optional Telegram configuration. If not provided, uses the global config.
 * @returns An object with log, warn, error, info, and debug methods, plus telegram methods
 */
export function createLogger(prefix: string): Logger {
    const logMethods = {
        log: (...args: any[]) => console.log(`[${prefix}]`, ...args),
        warn: (...args: any[]) => console.warn(`[${prefix}]`, ...args),
        error: (...args: any[]) => console.error(`[${prefix}]`, ...args),
        info: (...args: any[]) => console.info(`[${prefix}]`, ...args),
        debug: (...args: any[]) => console.debug(`[${prefix}]`, ...args),
    }
    const isDev = import.meta.dev;
  
  const createTelegramMethod = (level: LogLevel) => {
    
    return async (...args: any[]): Promise<void> => {
      logMethods[level](...args);

      if(isDev) {
        return Promise.resolve();
      }

      const message = [`[${prefix}]`, ...args].map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join('\n');

      useFetch('/api/mobileLog', {
        method: 'POST',
        body: { message, level },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(({ status, error, data }) => {
        const isSuccessful = status.value === 'success' && data.value!.success;
        if (!isSuccessful) {
          throw error.value;
        }

        logMethods.log(data.value!.message)
      }).catch((error) => {
        logMethods.error(error);
      })
    };
  };
  
  return {
    ...logMethods,
    telegram: {
      log: createTelegramMethod('log'),
      warn: createTelegramMethod('warn'),
      error: createTelegramMethod('error'),
      info: createTelegramMethod('info'),
      debug: createTelegramMethod('debug')
    }
  };
}

export const customLogger = createLogger('Boilerplate');