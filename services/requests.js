const Item = require("../models").Item
const axios = require("axios")
const { Op } = require("sequelize")

const getAll = async () => {
	try {
		axios
			.get(`${process.env.SERVER_URL}/devices`)
			.then(async function (response) {
				await response.data.map(async item => {
					const entery = await Item.findOne({
						where: {
							p2: {
								[Op.like]: String(item.p2),
							},
						},
					})
					if (entery) {
						entery.datatime = item.datatime
						await entery.save()
						// entery.update({ ...item })
					} else {
						await Item.create({ ...item, access: true })
					}
					console.log("--------------------- ready --------------------------")
				})
			})
			.catch(function (error) {
				// handle error
				console.log(error)
			})
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const getSingle = async (ownerId, active) => {
	try {
		axios
			.get(`${process.env.SERVER_URL}/devices/?ID=${ownerId}`)
			.then(async response => {
				const item = await Item.findOne({
					where: { p2: String(ownerId) },
				})
				await item.update({
					p0: response.data[0].p0,
					name: response.data[0].name,
					p2: response.data[0].p2, // ownerId
					p5: response.data[0].p5, // moikaID
					datatime: response.data[0].datatime,
				})
				console.log("--------------------- updated --------------------------")
			})
			.catch(error => {
				console.error(error)
			})
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const setReserve = async data => {
	try {
		axios
			.post(`${process.env.SERVER_URL}/device/reserv`, data)
			.then(response => {
				console.log(
					response,
					"--------------------- success --------------------------"
				)
			})
			.catch(error => {
				console.error(error)
			})
	} catch (e) {
		console.log("something went wrong", e)
	}
}

const checkPost = ownerId => {
	return axios
		.get(`${process.env.SERVER_URL}/money/?id=${ownerId}`)
		.then(response => {
			return response.data[0]
		})
		.catch(error => {
			console.error(error)
		})
}

module.exports = {
	getAll,
	getSingle,
	setReserve,
	checkPost,
}
