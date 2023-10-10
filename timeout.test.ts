import { describe, it, expect, mock } from "bun:test";
import { withTimeout } from "./timeout";

const mockFetch = mock(() => {
    return new Promise<Response>((resolve) => {
        setTimeout(() => {
            resolve(new Response("ok", { status: 200 }));
        }, 100);
    })
})

describe("timeout", () => {

    it("should throw an error when it times out", () => {
        const fetch = withTimeout(mockFetch, 10);
        const fetchThrow = () => fetch("http://example.com");
        expect(fetchThrow).toThrow("Timeout after 10 ms");
    })

    it("should return the response", async () => {
        const fetch = withTimeout(mockFetch, 200);
        expect(fetch("http://example.com")).resolves.toEqual(new Response("ok", { status: 200 }));
    })
})