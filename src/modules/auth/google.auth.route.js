import express from "express";
import passport from "passport";

const router = express.Router();

// Step 1: redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth/failure`
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${req.user.token}`);
  }
);


export default router;
