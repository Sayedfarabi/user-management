import express, { Request, Response, text } from "express";
import cors from "cors";
const app = express();

// parser
app.use(express.json());
app.use(text());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
