export default function handler(req, res) {
  const authHeader = req.headers["authorization"];
  const secret = process.env.API_SECRET;

  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = req.query.email?.toLowerCase();

  const members = {
    "bronze@aetest.com": "bronze",
    "silver@aetest.com": "silver",
    "gold@aetest.com": "gold"
  };

  if (members[email]) {
    return res.status(200).json({
      membership: "yes",
      tier: members[email]
    });
  }

  return res.status(200).json({
    membership: "no",
    tier: null
  });
}
