const Event = require("../models/event");

const createOne = async (req, res) => {
  const { body, user } = req;

  try {
    const event = new Event({
      ...body,
      user: user.uid,
    });

    await event.save();

    res.status(201).json({
      ok: true,
      msg: 'Event created',
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Error: Event can not be created',
      error: err,
    });
  }
};

const deleteById = (req, res) => {
  const { eventId } = req.params;

  res.status(204).json({
    ok: true,
    msg: 'Event deleted',
    eventId,
  });
};

const getAll = async (req, res) => {
  const { uid } = req.user;

  try {
    const events = await Event.find({ user: uid });
    
    res.status(200).json({
      ok: true,
      msg: 'Got events',
      data: events,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Error: Events can not be retrieved',
      error: err,
    });
  }
};

const updateById = (req, res) => {
  const { body: data } = req;
  const { eventId } = req.params;

  res.status(202).json({
    ok: true,
    msg: 'Event updated',
    data,
    eventId,
  });
};

module.exports = {
  createOne,
  deleteById,
  getAll,
  updateById,
};
