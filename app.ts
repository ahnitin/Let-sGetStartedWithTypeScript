import express from "express";
import todosRoutes from "./routes/todos";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(todosRoutes);

app.listen(3000);