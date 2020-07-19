const express = require("express");
import cors from "cors";
import { Database } from "./services";
import { lastNMessages, addMessage } from "./queries";
import bodyParser from "body-parser";
import { getSafe } from "./utils";

const main = async () => {
  const db = new Database({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
  });

  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get(
    "/messages",
    // tslint:disable-next-line: variable-name
    async (_req: any, res: { json: (arg0: unknown) => void }) => {
      res.json(await db.query(lastNMessages({ limit: 100 })));
    }
  );

  app.post(
    "/messages",
    async (req: any, res: { json: (arg0: unknown) => void }) => {
      const from = getSafe(() => req.body.from, "");
      const message = getSafe(() => req.body.message, "");

      await db.query(addMessage(from, message), {});
      res.json(await db.query(lastNMessages({ limit: 100 })));
    }
  );

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${process.env.SERVER_PORT}!`);
  });
};

main();
