import { Hono } from "hono";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const app = new Hono();

// ルートエンドポイント
app.get("/", (c) => c.text("Hello from Hono on Vercel!"));

// Vercel の Serverless Functions に対応するハンドラー
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const request = new Request(`https://${req.headers.host}${req.url}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
  });

  const honoResponse = await app.fetch(request);

  honoResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.status(honoResponse.status).send(await honoResponse.text());
}
