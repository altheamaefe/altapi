export default function handler(req, res) {
  const authHeader = req.headers["authorization"];

  // Expecting: Authorization: Bearer YOUR_SECRET_KEY
  if (!authHeader || authHeader !== "Bearer AE_SECRET_123") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = req.query.email;

  if (email === "vip@test.com") {
    return res.status(200).json({
      allowed: true,
      tier: "VIP"
    });
  }

  return res.status(200).json({
    allowed: false,
    tier: "NONE"
  });
}
