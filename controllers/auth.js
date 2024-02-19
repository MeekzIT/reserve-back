const Admin = require("../models").Admin;
const SuperAdmin = require("../models").SuperAdmin;
const Owner = require("../models").Owner;
const Users = require("../models").User;
const Tech = require("../models").Tech;
const Worker = require("../models").Worker;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const superAdmin = await SuperAdmin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (superAdmin && (await bcrypt.compare(password, superAdmin.password))) {
      const token = jwt.sign(
        { user_id: superAdmin.id, email, role: superAdmin.role },
        process.env.TOKEN_KEY_ADMIN
      );
      superAdmin.token = token;
      superAdmin.save();
      return res.json({ data: superAdmin, succes: true });
    }

    const user = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email, role: user.role },
        process.env.TOKEN_KEY_ADMIN
      );
      user.token = token;
      user.save();
      return res.json({ data: user, succes: true });
    }

    const tech = await Tech.findOne({
      where: { email: email.toLowerCase() },
    });

    if (tech && (await bcrypt.compare(password, tech.password))) {
      const token = jwt.sign(
        { user_id: tech.id, email, role: tech.role },
        process.env.TOKEN_KEY_ADMIN
      );
      tech.token = token;
      tech.save();
      return res.json({ data: tech, succes: true });
    }

    const owner = await Owner.findOne({
      where: { email: email.toLowerCase() },
    });

    if (owner && (await bcrypt.compare(password, owner.password))) {
      const token = jwt.sign(
        { user_id: owner.id, email, role: owner.role },
        process.env.TOKEN_KEY_ADMIN
      );
      owner.token = token;
      owner.save();
      return res.json({ succes: true, data: owner });
    }

    const worker = await Worker.findOne({
      where: { email: email.toLowerCase() },
    });

    if (worker && (await bcrypt.compare(password, worker.password))) {
      const token = jwt.sign(
        { user_id: worker.id, email, role: worker.role },
        process.env.TOKEN_KEY_ADMIN
      );
      worker.token = token;
      worker.save();
      return res.json({ succes: true, data: worker });
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const { user_id, role } = req.user;

    if (role == "admin") {
      const user = await Admin.findOne({ where: { id: user_id } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { id: 1 } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({ where: { id: user_id } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "user") {
      const user = await Tech.findOne({ where: { id: user_id } });
      user.token = null;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, role } = req.body;
    let encryptedPassword = await bcrypt.hash("test1234", 10);
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id },
      });
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getMe = async (req, res) => {
  try {
    const { role, user_id } = req.user;
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "admin", succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "user", succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "owner", succes: true });
    } else if (role == "user") {
      const user = await Tech.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "owner", succes: true });
    } else if (role == "worker") {
      const user = await Worker.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "worker", succes: true });
    } else {
      const user = await Users.findOne({
        where: { id: user_id },
      });
      return res.json({ data: user, super: "user", succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  login,
  logout,
  getMe,
  resetPassword,
};
