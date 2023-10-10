import { Fetch } from "./type";

interface Logger {
    log: (message: string) => void;
    info: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
}

export const withLogger = (fetch: (...args: any) => Promise<Response>, logger: Logger = console): Fetch => {
    return async (...args) => {
        const [input] = args;
        const response = await fetch(...args);
        if (typeof input === "string") {
            logger.info(`fetching ${input} and got ${response.status}`);
        }
        else if (input instanceof URL) {
            logger.info(`fetching ${input} and got ${response.status}`);
        }
        else {
            logger.info(`fetching ${input.url} and got ${response.status}`);
        }
        return response;
    }
}