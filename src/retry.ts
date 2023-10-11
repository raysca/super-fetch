type Fetch = (...args: any) => Promise<Response>;

interface RetryOptions {
    retryCount: number
    retryDelay?: number
    retryOn?: number[]
}

export const withRetry = (fetch: Fetch, options: RetryOptions) => {
    const { retryCount = 1, retryDelay = 1000, retryOn = [500] } = options;
    let response: Response;
    return async (...args: any): Promise<Response> => {
        let retry = 0;
        while (retry < retryCount) {
            response = await fetch(...args);
            if (retryOn.includes(response.status)) {
                retry++;
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
            }
            else {
                return response;
            }
        }
        return response;
    }
}