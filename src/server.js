import express, {json} from "express";
import routerTasks from "./routes/tasks.routes";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(json());

app.use("/", routerTasks);

export default app;
