const express = require('express');
const { path } = require('../app');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname,
    dotfiles: 'deny',
  })
})

module.exports = router;