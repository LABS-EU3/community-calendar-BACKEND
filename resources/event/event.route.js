const express = require("express");

const router = express.Router();
const eventController = require("./event.controller");

router.get('/fetch-events', async (req, res, next) => {
  try {
    const { userCity, userCountry, eventType } = req.body;
    const events = await eventController.addScrapedEvent(userCountry, userCity, eventType);
    if (!events) {
      res
        .status(500)
        .json('Events could not be inserted or they already exist');
    }
    res
      .status(200)
      .json(events);
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = router;
