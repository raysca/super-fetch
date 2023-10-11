import { describe, it, mock, expect } from "bun:test";
import { withExtraHeaders } from "./headers";

const mockFetch = mock(() => {
    return new Promise<Response>((resolve) => {
        setTimeout(() => {
            resolve(new Response("ok", { status: 200 }));
        }, 100);
    })
})

describe("headers", () => {
    it("should add the extra headers to a request", async () => {
        const fetchWithHeaders = withExtraHeaders(mockFetch, { "X-Test": "test" });
        await fetchWithHeaders("http://example.com", {
            headers: {
                "content-type": "application/json"
            }
        });
        const [, options] = mockFetch.mock.lastCall ?? ['', {}];
        expect(options).toEqual({
            headers: {
                "content-type": "application/json",
                "X-Test": "test"
            }
        });
    })
})