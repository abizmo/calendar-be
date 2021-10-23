const router = require('express').Router();
const { body } = require('express-validator');

const authCtrl = require('../controllers/auth');
const fieldsValidator = require('../middlewares/fieldsValidator');
const tokenValidation = require('../middlewares/tokenValidation');

router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password length has to be greater than 5').isLength({ min: 6 }),
    fieldsValidator,
  ],
  authCtrl.registerUser,
);

router.post(
  '/login',
  [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password length has to be greater than 5').isLength({ min: 6 }),
    fieldsValidator,
  ],
  authCtrl.loginUser,
);

router.get('/renew', tokenValidation, authCtrl.renewToken);

module.exports = router;
