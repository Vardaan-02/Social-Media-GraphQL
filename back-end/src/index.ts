import { initServer } from "./app";
import * as dotenv from "dotenv"
import { User } from "./interfaces";
dotenv.config();

const PORT=8000;

async function init(){
  const app=await initServer();

  app.listen(PORT,'0.0.0.0',()=>console.log(`server started at PORT: ${PORT}`));
}
init();

export const users:User[]=[];