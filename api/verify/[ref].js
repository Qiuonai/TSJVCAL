const reports = require("../data/reports.json");

module.exports = (req, res) => {
  const ref = (req.query.ref || "").trim().toUpperCase();
  const record = reports[ref];

  if (!record) {
    res.status(404).json({ error: "No report found for this reference number." });
    return;
  }

  res.status(200).json(record);
};
