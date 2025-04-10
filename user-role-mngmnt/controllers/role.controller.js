const Role = require("../models/role.model");

exports.createRole = async (req, res) => {
  try {
    const { roleName, accessModules, active } = req.body;
    const uniqueModules = [...new Set(accessModules)];

    const newRole = new Role({
      roleName,
      accessModules: uniqueModules,
      active,
    });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const search = req.query.search || "";
    const roles = await Role.find({
      roleName: { $regex: search, $options: "i" },
    });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAccessModule = async (req, res) => {
  try {
    const { module } = req.body;
    const role = await Role.findById(req.params.id);
    if (!role.accessModules.includes(module)) {
      role.accessModules.push(module);
      await role.save();
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeAccessModule = async (req, res) => {
  try {
    const { module } = req.body;
    const role = await Role.findById(req.params.id);
    role.accessModules = role.accessModules.filter((m) => m !== module);
    await role.save();
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
