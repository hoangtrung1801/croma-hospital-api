const express = require('express');
const router = express.Router();

const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const patientRouter = require('./routes/patient.route');
const lobbyRouter = require('./routes/lobby.route');
const doctorRouter = require('./routes/doctor.route');

const verifyAuthorization = require('./middlewares/verifyAuthorization');

router.use(verifyAuthorization);

router.get('/', async  (req, res) => {
  let role = 'patient';
  if(res.locals.user) {
    role = res.locals.user.role;
  }
  res.send(`Hi ${role}`);
})

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/patient', patientRouter);
router.use('/lobby', lobbyRouter);
router.use('/doctor', doctorRouter);

module.exports = router;
