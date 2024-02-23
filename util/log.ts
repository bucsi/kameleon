type Level = "DEBUG" | "WARNING" | "ERROR";

const produceMessage = (message: string, data: object, level: Level): string =>
    JSON.stringify({ message: message, level: level, ...data });

export const log = {
    debug: (message: string, additional: object = {}) => console.debug(produceMessage(message, additional, "DEBUG")),
    warn: (message: string, additional: object = {}) => console.warn(produceMessage(message, additional, "WARNING")),
    error: (message: string, additional: object = {}) => console.error(produceMessage(message, additional, "ERROR")),
};
