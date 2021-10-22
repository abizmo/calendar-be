const router = require('express').Router();

const { body } = require('express-validator');
const eventCtrl = require('../controllers/events');
const fieldsValidator = require('../middlewares/fieldsValidator');
const tokenValidation = require('../middlewares/tokenValidation');
const isDate = require('../utils/isDate');

router.use(tokenValidation);

router.get('/', eventCtrl.getAll);

router.post(
  '/',
  [
    body('title', 'Title is required').notEmpty(),
    body('start', 'Start has to be a valid date').custom(isDate),
    body('end', 'End has to be a valid date').custom(isDate),
    fieldsValidator,
  ],
  eventCtrl.createOne
);

router.put('/:eventId', eventCtrl.updateById);

router.delete('/:eventId', eventCtrl.deleteById);

module.exports = router;
