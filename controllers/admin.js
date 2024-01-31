const Admin = require("../models").Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, countryId } = req.body;
    const { role } = req.user;
    if (role == "superAdmin") {
      const oldUser = await Admin.findOne({
        where: { email },
      });
      if (oldUser) {
        return res.json({ message: "alredy exist" });
      } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: encryptedPassword,
          countryId,
          role: "admin",
          block: false,
        });

        return res.json({ succes: true, data: admin });
      }
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const destroyAdmin = async (req, res) => {
  try {
    const { id, block } = req.body;
    const { role } = req.user;

    if (role == "superAdmin") {
      await Admin.destroy({
        where: { id },
      });
      return res.json({ succes: true });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAdmins = async (req, res) => {
  try {
    const { role } = req.user;

    if (role == "superAdmin") {
      const admin = await Admin.findAll();
      return res.json({ succes: true, data: admin });
    } else return res.json({ succes: false });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changeSettings = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { email, firstName, lastName } = req.body;
    if (role == "admin") {
      const user = await Admin.findOne({ where: { id: 1 } });
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({ where: { id: user_id } });
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({ where: { id: user_id } });
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { user_id, role } = req.user;
    const { password } = req.body;
    if (role == "admin") {
      const user = await Admin.findOne({
        where: { id: 1 },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();
      return res.json({ succes: true });
    } else if (role == "superAdmin") {
      const user = await SuperAdmin.findOne({
        where: { id: user_id },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();

      return res.json({ succes: true });
    } else if (role == "owner") {
      const user = await Owner.findOne({
        where: { id: user_id },
      });
      let encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();

      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  destroyAdmin,
  getAdmins,
  changePassword,
  changeSettings,
};
