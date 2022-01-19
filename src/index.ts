import express, { Request, Response } from "express";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type Data = {
  posts: {
    timestamp: number;
    text: string;
    user: string;
  }[];
};

const file = join(__dirname, "db.json");
console.log({ file });
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

const app = express();
app.use(express.json());
const port = 3000;

const prepDb = async () => {
  await db.read();
  db.data = db.data || { posts: [] };
  console.log("db prepped");
};

prepDb();

app.get("/", (req: Request, res: Response) => {
  res.json({ greeting: "Hello world!" });
});
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/messages", async (req, res) => {
  console.log(db.data?.posts);

  res.json(db.data?.posts);
});

app.post("/message", async (req, res) => {
  console.log(req.body);

  if (!req.headers.secret || req.headers.secret !== "cwd") {
    res.send("Not authorized");
  } else {
    if (req.body.text && req.body.user) {
      db.data?.posts.push({
        timestamp: Date.now(),
        text: req.body.text,
        user: req.body.user,
      });

      await db.write();
      res.send("Message saved");
    } else {
      res.send("Error. Please provide text and user in the json body");
    }
  }
});

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});
