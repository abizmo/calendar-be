const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  description: String,
  end: {
    type: Date,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

eventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model('Event', eventSchema);
