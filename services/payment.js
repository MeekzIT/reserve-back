const axios = require("axios")

const setPayment = (price, id) => {
	return axios
		.post("https://ipaytest.arca.am:8445/payment/rest/register.do", null, {
			params: {
				userName: "jsi_api",
				password: "Test1234!",
				amount: price,
				currency: "051",
				language: "hy",
				orderNumber: Number(id) + 99,
				returnUrl: "https://reserve.jsxmachines.com/result",
				pageView: "MOBILE",
			},
		})
		.then(function (response) {
			console.log(response.data, "response.data")
			if (response.data.errorCode == 0) {
				return {
					succes: true,
					data: response.data.formUrl,
					orderId: response.data.orderId,
				}
			} else {
				return { succes: false }
			}
		})
		.catch(function (error) {
			console.log(error)
		})
}

module.exports = {
	setPayment,
}
