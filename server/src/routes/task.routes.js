import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Get Tasks" });
});


router.post("/", (req, res) => {
  res.json({ message: "Create Task" });
});


router.put("/:id", (req, res) => {
  res.json({ message: "Update Task" });
});


router.delete("/:id", (req, res) => {
  res.json({ message: "Delete Task" });
});

export default router;