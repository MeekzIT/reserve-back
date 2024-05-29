const Owner = require("../models").Owner
const Order = require("../models").Order
const Boxes = require("../models").Box
const { Op, where } = require("sequelize")
const {
	boxStatistics,
	boxCurrentResult,
	sumCounters,
} = require("../services/statistics")
const { mergeBoxStates } = require("../helpers/statistics")

const getBoxStatistics = async (req, res) => {
	try {
		const { boxId, start, end } = req.query

		const data = await boxStatistics(boxId, start, end)

		return res.json({ succes: true, data })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getBoxCurrent = async (req, res) => {
	try {
		const { boxId } = req.query

		const data = await boxCurrentResult(boxId)

		return res.json({ succes: true, data })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getOwnerStatistics = async (req, res) => {
	try {
		const { ownerId, start, end } = req.query
		let allBoxesStates = []
		const allBoxes = await Boxes.findAll({
			where: {
				ownerId,
			},
		})
		await Promise.all(
			allBoxes.map(async box => {
				const boxState = await boxStatistics(box.dataValues.id, start, end)
				if (await boxState) {
					allBoxesStates.push(...boxState)
				}
			})
		)
		const result = mergeBoxStates(allBoxesStates)
		return res.json({ succes: true, data: result })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getOwnerCurrent = async (req, res) => {
	try {
		const { ownerId } = req.query
		let allBoxesStates = []
		const allBoxes = await Boxes.findAll({
			where: {
				ownerId,
			},
		})
		await Promise.all(
			allBoxes.map(async box => {
				const boxState = await boxCurrentResult(box.dataValues.id)
				if (await boxState) {
					allBoxesStates.push(boxState)
				}
			})
		)
		const result = sumCounters(allBoxesStates)
		return res.json({ succes: true, data: result })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getUserStatistics = async (req, res) => {
	try {
		const { userId, start, end } = req.query
		let allBoxesStates = []

		const allUsers = await Owner.findAll({
			where: { userId },
		})
		await Promise.all(
			allUsers.map(async user => {
				const allBoxes = await Boxes.findAll({
					where: {
						ownerId: user.dataValues.deviceOwner,
					},
				})
				await Promise.all(
					allBoxes.map(async box => {
						const boxState = await boxStatistics(box.dataValues.id, start, end)
						if (await boxState) {
							allBoxesStates.push(...boxState)
						}
					})
				)
			})
		)

		const result = mergeBoxStates(allBoxesStates)
		return res.json({ succes: true, data: result })
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getUserCurrent = async (req, res) => {
	try {
		const { userId } = req.query
		let allBoxesStates = []

		const allUsers = await Owner.findAll({
			where: { userId },
		})
		await Promise.all(
			allUsers.map(async user => {
				const allBoxes = await Boxes.findAll({
					where: {
						ownerId: user.dataValues.deviceOwner,
					},
				})
				await Promise.all(
					allBoxes.map(async box => {
						const boxState = await boxCurrentResult(box.dataValues.id)
						if (await boxState) {
							allBoxesStates.push(boxState)
						}
					})
				)
			})
		)

		const result = sumCounters(allBoxesStates)
		return res.json({ succes: true, data: result })
	} catch (e) {
		console.log("something went wrong", e)
	}
}
module.exports = {
	getBoxStatistics,
	getOwnerStatistics,
	getUserStatistics,
	getBoxCurrent,
	getOwnerCurrent,
	getUserCurrent,
}
