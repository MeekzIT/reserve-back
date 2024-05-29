const Order = require("../models").Order
const dayjs = require("dayjs")
const { Op } = require("sequelize")
const { mergeItemsByDate, addMissingDays } = require("../helpers/statistics")

const boxStatistics = async (boxId, start, end) => {
	try {
		const whereClause = {}
		if (start) {
			whereClause.createdAt = {
				[Op.gte]: start,
			}
		}

		if (end) {
			if (whereClause.createdAt) {
				whereClause.createdAt[Op.lte] = end
			} else {
				whereClause.createdAt = {
					[Op.lte]: end,
				}
			}
		}

		const data = await Order.findAll({
			where: { ...whereClause, boxId: String(boxId) },
		})
		const result = await mergeItemsByDate(data)
		return addMissingDays(result, start, end)
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const boxCurrentResult = async boxId => {
	try {
		const startOfToday = dayjs().startOf("day").toDate()
		const endOfToday = dayjs().endOf("day").toDate()
		let workerCounter = 0
		let priceCounter = 0
		const orders = await Order.findAll({
			where: {
				boxId: String(boxId),
				createdAt: {
					[Op.gte]: startOfToday,
					[Op.lte]: endOfToday,
				},
			},
		})
		orders.map(order => {
			if (order.dataValues.worker) {
				workerCounter = workerCounter + 1
			}
			if (order.dataValues.price) {
				priceCounter = priceCounter + Number(order.dataValues.price)
			}
		})
		return {
			all: orders.length,
			workerCounter,
			priceCounter,
		}
	} catch (e) {
		console.log("something went wrong", e)
	}
}

function sumCounters(array) {
	return array.reduce(
		(accumulator, currentValue) => {
			accumulator.all += currentValue.all
			accumulator.workerCounter += currentValue.workerCounter
			accumulator.priceCounter += currentValue.priceCounter
			return accumulator
		},
		{
			all: 0,
			workerCounter: 0,
			priceCounter: 0,
		}
	)
}

module.exports = {
	boxStatistics,
	boxCurrentResult,
	sumCounters,
}
