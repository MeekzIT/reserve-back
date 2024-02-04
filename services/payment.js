const setPayment = async (data) => {
  try {
    console.log(
      data,
      "--------------------- payment success --------------------------"
    );
    return true;
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  setPayment,
};
