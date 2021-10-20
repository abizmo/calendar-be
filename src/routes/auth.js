const router = require('express').Router();
const { body } = require('express-validator');

const controller = require('../controllers/auth');
const fieldsValidator = require('../middlewares/fieldsValidator');

router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password length has to be greater than 5').isLength({ min: 6 }),
    fieldsValidator,
  ],
  controller.registerUser
);

router.post(
  '/login', 
  [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password length has to be greater than 5').isLength({ min: 6 }),
    fieldsValidator,
  ],
  controller.loginUser
);

router.get('/renew', controller.renewToken);

module.exports = router;