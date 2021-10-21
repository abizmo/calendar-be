const createOne = (req, res) => {
  const { body: data } = req;

  res.status(201).json({
    ok: true,
    msg: 'Event created',
    data,
  });
};

const deleteById = (req, res) => {
  const { eventId } = req.params;

  res.status(204).json({
    ok: true,
    msg: 'Event deleted',
    eventId,
  });
};

const getAll = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: 'Events got',
  });
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
