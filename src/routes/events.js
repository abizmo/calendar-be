const router = require('express').Router();

const eventCtrl = require('../controllers/events');
const tokenValidation = require('../middlewares/tokenValidation');

router.get('/', tokenValidation, eventCtrl.getAll);

router.post('/', tokenValidation, eventCtrl.createOne);

router.put('/:eventId', tokenValidation, eventCtrl.updateById);

router.delete('/:eventId', tokenValidation, eventCtrl.deleteById);

module.exports = router;