import {Router} from "express";
import {ObjectID} from "mongodb";
import connectDB from "../database";

const router = Router();

router.get("/", async (req, res) => {
    const db = await connectDB();
    const resp = await db.collection("tasks").find({}).toArray();
    res.json(resp);
});

router.post("/", async (req, res) => {
    const db = await connectDB();
    const task = {
        title: req.body.title,
        description: req.body.description,
    };
    const resp = await db.collection("tasks").insert(task);
    res.json(resp.ops[0]);
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const db = await connectDB();
    const resp = await db.collection("tasks").findOne({_id: ObjectID(id)});
    res.json(resp);
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const db = await connectDB();
    const resp = await db.collection("tasks").deleteOne({_id: ObjectID(id)});
    res.json({
        message: `Task ${id} deleted`,
        resp,
    });
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const db = await connectDB();
    const updateTask = {
        title: req.body.title,
        description: req.body.description,
    };
    const resp = await db
        .collection("tasks")
        .updateOne({_id: ObjectID(id)}, {$set: updateTask});
    res.json({
        message: `Task ${id} updated`,
        resp,
    });
});

export default router;
