const Users = require("../models").User
const Contry = require("../models").Country
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")

const signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, phoneNumber, countryId } =
			req.body
		const oldUser = await Users.findOne({
			where: { email: email.toLowerCase() },
		})
		if (oldUser) {
			return res.json({ message: "alredy exist" })
		} else {
			let encryptedPassword = await bcrypt.hash(password, 10)
			const newUser = await Users.create({
				firstName,
				lastName,
				email: email.toLowerCase(),
				phoneNumber,
				password: encryptedPassword,
				countryId,
				role: "user",
				activity: true,
			})
			const user = await Users.findOne({
				where: { id: newUser.id },
				include: [
					{
						model: Contry,
					},
				],
			})
			return res.json({ succes: true, data: user })
		}
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!(email && password)) {
			return res.json({
				error: ["Password and email are required fields"],
			})
		}

		const user = await Users.findOne({
			where: { email: email.toLowerCase(), activity: true },
		})

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user.id, email, role: user.role },
				process.env.TOKEN_KEY_ADMIN
			)
			user.token = token
			user.save()
			return res.json({ data: user, succes: true })
		}
		return res.json({ succes: false })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const logout = async (req, res) => {
	try {
		const { user_id } = req.user

		const user = await Users.findOne({ where: { id: user_id } })
		user.token = null
		await user.save()
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getMe = async (req, res) => {
	try {
		const { user_id } = req.user
		const user = await Users.findOne({
			where: { id: user_id },
		})
		return res.json({ data: user, super: "user", succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

//admin control

const getAll = async (req, res) => {
	const { phoneNumber, activity } = req.query
	const offset = Number.parseInt(req.query.offset) || 0
	const limit = Number.parseInt(req.query.limit) || 12
	const count = await Users.findAll()
	let queryObj = {}
	if (phoneNumber) {
		queryObj["phoneNumber"] = {
			[Op.like]: "%" + String(phoneNumber) + "%",
		}
	}

	if (activity) {
		queryObj["activity"] = {
			[Op.eq]: activity,
		}
	}

	try {
		const allUsers = await Users.findAll({
			where: {
				...queryObj,
			},
			offset: offset * limit,
			limit,
			include: [
				{
					model: Contry,
				},
			],
		})
		return res.json({ paginateData: allUsers, count: count.length })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const activity = async (req, res) => {
	try {
		const { activity, id } = req.body

		const user = await Users.findOne({ where: { id } })
		user.activity = activity
		await user.save()
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const destroy = async (req, res) => {
	try {
		const { id } = req.body
		await Users.destroy({ where: { id } })
		return res.json({ succes: true })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

module.exports = {
	signUp,
	signIn,
	logout,
	getMe,
	getAll,
	activity,
	destroy,
}
