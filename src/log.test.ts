import { describe, it, mock, expect, beforeAll } from "bun:test";
import { withLogger } from "./log";

const mockFetch = mock(() => {
    return Promise.resolve(new Response("ok", { status: 200 }));
})

const mockLogger = {
    log: mock((_: string) => 'void'),
    info: mock((_: string) => 'void'),
    error: mock((_: string) => 'void'),
    warn: mock((_: string) => 'void')
}

describe("logging", () => {
    let response: Response;
    beforeAll(async () => {
        const fetch = withLogger(mockFetch, mockLogger);
        response = await fetch("http://example.com");
    })

    it("should call fetch with a string parameter", async () => {
        const [firstCall] = mockFetch.mock.lastCall ?? [''];
        expect(firstCall).toEqual("http://example.com");
    })

    it("should log the url and the response status", async () => {
        const [firstCall] = mockLogger.info.mock.lastCall ?? [];
        expect(firstCall).toEqual('fetching http://example.com and got 200');
    })

    it("should return the response", async () => {
        expect(response).toEqual(new Response("ok", { status: 200 }));
    })
})