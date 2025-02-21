import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import express from "express";
import { ARCJET_KEY } from "./env.js";

const app = express();
const port = 3000;

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
});

function isSpoofed(result) {
    return (
        result.state !== "DRY_RUN" &&
        result.reason.isBot() &&
        result.reason.isSpoofed()
    );
}

app.get("/", async (req, res) => {
    const decision = await aj.protect(req, { requested: 5 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            res.writeHead(429, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Too Many Requests" }));
        } else if (decision.reason.isBot()) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No bots allowed" }));
        } else {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden" }));
        }
    } else if (decision.results.some(isSpoofed)) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello World" }));
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default aj