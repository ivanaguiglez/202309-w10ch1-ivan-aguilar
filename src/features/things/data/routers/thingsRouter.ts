import { Router } from "express";
import things from "../things";

const thingsRouter = Router();

thingsRouter.get("/", (_req, res) => {
  res.status(200).json({ things });
});

thingsRouter.get("/:thingId", (req, res) => {
  const thingId = parseInt(req.params.thingId, 8);
  const thing = things.find((thing) => thing.id === thingId);

  if (!thing) {
    res.status(404).json({ error: "This thing doesn't exist" });
    return;
  }

  res.status(200).json(thing);
});

thingsRouter.delete("/:thingId", (req, res) => {
  const thingId = parseInt(req.params.thingId, 8);
  const thingIndex = things.findIndex((thing) => thing.id === thingId);

  if (thingIndex === -1) {
    res.status(404).json({ error: "This thing doesn't exist" });
  }

  things.splice(thingIndex, 1);

  res.status(200).json({});
});

export default thingsRouter;
