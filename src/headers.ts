type Fetch = (...args: any) => Promise<Response>;

export const withExtraHeaders = (fetch: Fetch, headers: HeadersInit): Fetch => {
    return async (...args: any) => {
        const [input, init = {}] = args;
        return  fetch(input, {
            ...init,
            headers: {
                ...init.headers,
                ...headers
            }
        });     
    }
}