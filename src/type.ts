export type RequestInfo = string | URL | Request;
export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
