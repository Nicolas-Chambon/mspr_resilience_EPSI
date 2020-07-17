const express = require('express');
const router = express.Router();
const path = require('path');
const { confirmNav } = require('../utils/nav-management');

const CONFIRM_FILE_PATH = path.join(__dirname, '../../public');

router.get("/confirm-nav", async (req, res) => {

  const { user, navigator } = req.query;

  if (!user || !navigator) {
    res.status(400).json({ error: "Missing fields." });
  } else {
    try {
      await confirmNav(user, navigator)
      res.sendFile(path.join(CONFIRM_FILE_PATH, 'confirm-nav.html'));
    }
    catch (e) {
      console.error(e);
      res.status(400).json({error: "Bad request !"});
    }
  }
});

module.exports = router;
