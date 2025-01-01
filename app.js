import express from "express";
import simpleRoutes from "./v1/routes.js";
import mongoRoutes from "./v2/routes.mongo.js";
import connectToDB from "./v2/mongo.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./v2/.env"
});

const app = express();

app.use(express.json());
app.use("/v1", simpleRoutes);
app.use("/v2", mongoRoutes);

connectToDB()
    .then(() => {
        app.listen(process.env.PORT || 3080, () => {
            console.log(`Server is running on port: ${process.env.PORT || 3080}\nYou can use both v1 and v2 routes!`);
        });
    })
    .catch((err) => {
        console.error(`MongoDB Connection failed: ${err}`);
        app.listen(process.env.PORT || 3080, () => {
            console.log(`Server is running on port: ${process.env.PORT || 3080}\nYou can use only v1 routes now!`);
        });
    });
