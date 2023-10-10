import { describe, it, mock, expect, beforeEach } from "bun:test";
import { withRetry } from "./retry";

const mockFetch = mock(() => {
    return Promise.resolve(new Response("ok", { status: 500 }));
})

describe("retry", () => {

    beforeEach(() => {
        mockFetch.mockClear();
    })

    it("should on retry error", async () => {
        const fetch = withRetry(mockFetch, { retryCount: 3, retryDelay: 50, retryOn: [500] });
        await fetch("http://example.com");

        expect(mockFetch.mock.calls.length).toEqual(3);
    })

    it("No retires if no matching response status", async () => {
        const fetch = withRetry(mockFetch, { retryCount: 3, retryDelay: 50, retryOn: [400, 300] });
        await fetch("http://example.com");

        expect(mockFetch.mock.calls.length).toEqual(1);
    })
})