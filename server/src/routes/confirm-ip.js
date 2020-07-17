const express = require('express');
const router = express.Router();
const path = require('path');
const { confirmIp } = require('../utils/ip-management');

const CONFIRM_FILE_PATH = path.join(__dirname, '../../public');

router.get("/confirm-ip", async (req, res) => {
  const { user, ip, country } = req.query;

  if (!user || !ip || !country) {
    res.status(400).json({ error: "Missing username or password." });
  } else {
    try {
      await confirmIp(user, ip)
      res.sendFile(path.join(CONFIRM_FILE_PATH, 'confirm-ip.html'));
    }
    catch (e) {
      console.error(e);
      res.status(400).json({error: "Bad request !"});
    }
  }
});

module.exports = router;
