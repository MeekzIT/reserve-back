const dayjs = require("dayjs")

function mergeItemsByDate(arr) {
	const merged = {}
	arr.forEach(item => {
		const date = dayjs(item.dataValues.createdAt).format("YYYY-MM-DD")

		if (!merged[date]) {
			merged[date] = {
				boxId: item.boxId,
				price: parseFloat(item.price),
				createdAt: item.createdAt,
			}
		} else {
			merged[date].price += parseFloat(item.dataValues.price)
		}
	})

	return Object.values(merged).map(item => ({
		boxId: item.boxId,
		price: item.price.toString(),
		date: dayjs(item.createdAt).format("YYYY-MM-DD"),
	}))
}

function mergeBoxStates(arr) {
	const merged = {}
	arr.forEach(item => {
		const date = item.date

		if (!merged[date]) {
			merged[date] = {
				price: parseFloat(item.price),
				createdAt: item.date,
			}
		} else {
			merged[date].price += parseFloat(item.price)
		}
	})

	return Object.values(merged).map(item => ({
		price: item.price.toString(),
		date: item.createdAt,
	}))
}

function addMissingDays(arr, start = null, end = null) {
	const date = new Date(arr[0].date)
	const year = date.getFullYear()
	const month = date.getMonth()

	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const startDate = start ? new Date(start) : new Date(year, month, 1)
	const endDate = end ? new Date(end) : new Date(year, month, daysInMonth)

	const existingDates = new Map(arr.map(item => [item.date, item]))

	for (let day = startDate.getDate(); day <= endDate.getDate(); day++) {
		const dayString = day.toString().padStart(2, "0")
		const dateString = `${year}-${(month + 1)
			.toString()
			.padStart(2, "0")}-${dayString}`

		if (!existingDates.has(dateString)) {
			arr.push({
				boxId: "1",
				price: "0",
				date: dateString,
			})
		}
	}

	arr.sort((a, b) => new Date(a.date) - new Date(b.date))

	return arr
}

module.exports = {
	mergeItemsByDate,
	addMissingDays,
	mergeBoxStates,
}
