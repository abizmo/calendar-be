const Event = require('../models/event');

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
      data: {
        ...event.toJSON(),
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Error: Event can not be created',
      error: err,
    });
  }
};

const deleteById = async (req, res) => {
  const { eventId } = req.params;
  const { uid } = req.user;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Authorization has been refused',
      });
    }

    await Event.deleteOne({ _id: eventId });

    return res.status(200).json({
      ok: true,
      msg: 'Event deleted',
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Event can not be deleted',
      error: err,
    });
  }
};

const getAll = async (req, res) => {
  const { uid } = req.user;

  try {
    const events = await Event.find({ user: uid })
      .populate('user', { _id: 0, name: 1 });

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

const updateById = async (req, res) => {
  const {
    description, end, start, title,
  } = req.body;
  const { uid } = req.user;
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }

    if (event.user.toString() !== uid) {
      res.status(401).json({
        ok: false,
        msg: 'Authorization has been refused',
      });
    }

    event.description = description || event.description;
    event.end = end || event.end;
    event.start = start || event.start;
    event.title = title || event.title;

    await event.save();

    res.status(202).json({
      ok: true,
      msg: 'Event updated',
      data: {
        ...event.toJSON(),
        user: { ...req.user },
      },
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Error: Event can not be updated',
      error: err,
    });
  }
};

module.exports = {
  createOne,
  deleteById,
  getAll,
  updateById,
};
