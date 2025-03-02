import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./blogs/blogs";
import auth from "./auth/auth"
import { basicAuth } from "hono/basic-auth";

const app = new Hono();


app.use(
  '/auth/*',
  basicAuth({
    username: 'ten1026',
    password: 'ten1026',
  })
)

app.use("*", prettyJSON());
app.route("/posts", posts);
app.route("/auth",auth)

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
