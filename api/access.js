export default function handler(req, res) {
  try {
    const secret = process.env.API_SECRET;

    // Accept token from Authorization (most common)
    const auth = req.headers.authorization || "";

    // AE may send either: "Bearer AE_SECRET_123" OR just "AE_SECRET_123"
    const ok =
      secret &&
      (auth === secret || auth === `Bearer ${secret}` || auth.includes(secret));

    if (!ok) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = (req.query.email || "").toLowerCase();

    const members = {
      "bronze@aetest.com": "bronze",
      "silver@aetest.com": "silver",
      "gold@aetest.com": "gold",
    };

    if (members[email]) {
      return res.status(200).json({ membership: "yes", tier: members[email] });
    }

    return res.status(200).json({ membership: "no", tier: "none" });
  } catch (e) {
    // NEVER let it crash silently; AE will show “system error”
    return res.status(500).json({ error: "Server error" });
  }
}
