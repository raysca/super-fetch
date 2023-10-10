
type Fetch = (...args: any) => Promise<Response>; 

const createTimeout = (timeout: number) => {
    return new Promise<Response>((_, reject) => {
       const timer =  setTimeout(() => {
            clearTimeout(timer);
            reject(new Error(`Timeout after ${timeout} ms`));
       }, timeout);
    });
}

export const withTimeout = (fetch: Fetch, timeout: number): Fetch => {
    return async (...args) => {
        return Promise.race([fetch(...args), createTimeout(timeout)]);
    }
}