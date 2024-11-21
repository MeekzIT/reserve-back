const { checkPost, setReserve } = require("./requests")

const Order = require("../models").Order
const Item = require("../models").Item
const ReservePoints = require("../models").ReservePoints

function getCurrentTimeInGMT() {
	const currentUTC = new Date().toUTCString()
	const hours = currentUTC.slice(17, 19)
	const minutes = currentUTC.slice(20, 22)
	const formattedTime = `${hours}:${minutes}`

	return formattedTime
}

const getCurrentTimeReserve = async (req, res) => {
	try {
		const actives = await ReservePoints.findAll({ where: { point: null } })
		const data = []
		const posts = []
		const currentTime = getCurrentTimeInGMT()
		await Promise.all(
			actives.map(i => {
				if (i.time == currentTime) {
					data.push(i.dataValues)
				}
			})
		)

		await Promise.all(
			data.map(async i => {
				const order = await Order.findOne({ where: { id: i.orderId } })
				const items = await Item.findAll({
					where: { p5: order.dataValues.boxId, access: true },
				})
				let reservedMoney = 1000
				let reservedPost = null
				await Promise.all(
					await items.map(async entery => {
						const active = await checkPost(entery.dataValues.p2)
						if (active !== undefined) {
							console.log(active, "------------active------------")
							if (active.money == 0 || active.money < reservedMoney) {
								reservedPost = active.ownerid
								reservedMoney = active.money
								posts.push(entery.dataValues)
							}
						}
					})
				)

				setReserve({
					OwnerID: reservedPost,
					Reserv: 1,
				})
				const post = await ReservePoints.findOne({ where: { id: i.id } })
				post.point = reservedPost
				await post.save()
			})
		)
		console.log(
			`============================== ${posts.length} are reserved ============================`
		)
	} catch (e) {
		console.log("something went wrong", e)
	}
}

module.exports = {
	getCurrentTimeReserve,
}
