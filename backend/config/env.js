import {config} from "dotenv";

config({ path: `.env` });

export const {PORT, NODE_ENV, DB_URI, JWT_SECRET} = process.env;