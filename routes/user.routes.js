const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.post("/", auth, userController.createUser);
router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

router.post("/check-access", auth, userController.checkAccess);
router.post("/batch-update-same", auth, userController.updateManySame);
router.post(
  "/batch-update-different",
  auth,
  userController.updateManyDifferent
);

module.exports = router;
