const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.patch("/:id/add-module", roleController.addAccessModule);
router.patch("/:id/remove-module", roleController.removeAccessModule);

module.exports = router;
