const Worker = require("../models").Worker;
const Boxes = require("../models").Box;

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

function generateTimeSlots(startHour, endHour, interval, id) {
  const result = [];
  const startDate = new Date(`2022-01-01T${startHour}:00`);
  const endDate = new Date(`2022-01-01T${endHour}:00`);
  const totalIntervals = Math.floor((endDate - startDate) / (interval * 60000));
  for (let i = 0; i < totalIntervals; i++) {
    const startTime = new Date(startDate.getTime() + i * interval * 60000);
    const endTime = new Date(startTime.getTime() + interval * 60000);
    const timeSlot = {
      start: `${formatTime(startTime.getHours())}:${formatTime(
        startTime.getMinutes()
      )}`,
      end: `${formatTime(endTime.getHours())}:${formatTime(
        endTime.getMinutes()
      )}`,
      access: true,
      id,
    };
    result.push(timeSlot);
  }

  return result;
}

function mergeTimeIntervals(inputArray) {
  const filteredArray = inputArray.filter((item) => item.access);

  const resultArray = [];
  const uniqueStartTimes = new Set();

  for (const item of filteredArray) {
    if (!uniqueStartTimes.has(item.start)) {
      resultArray.push({
        start: item.start,
        end: item.end,
        access: item.access,
      });
      uniqueStartTimes.add(item.start);
    }
  }

  return resultArray;
}

const annulWorkerDates = async (req, res) => {
  try {
    const allWorkers = await Worker.findAll();
    Promise.all(
      await allWorkers.map(async (item) => {
        const box = await Boxes.findOne({ where: { id: item.boxId } });
        console.log(item.dataValues, "-=-----");
        await item.update({
          hours: JSON.stringify(
            generateTimeSlots(
              item.startHour,
              item.endHour,
              box.interval,
              item.dataValues.id
            )
          ),
        });
        await item.save();
      })
    );
    console.log(
      "--------------------- update workers hours --------------------------"
    );
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const removeWorkerDate = async (boxId, time) => {
  try {
    const allWorkers = await Worker.findAll({ where: { boxId } });
    const allTimers = [];
    let current = null;
    await Promise.all(
      await allWorkers.map(async (item) => {
        workerTimer = JSON.parse(item.hours);
        allTimers.push(...workerTimer);
      })
    );
    await allTimers.map((entery) => {
      if (entery.start == time && entery.access !== false) {
        current = entery;
      } else return;
    });
    if (current) {
      const worker = await Worker.findOne({ where: { id: current.id } });
      const workerHours = JSON.parse(worker.hours);
      await workerHours.map((entery) => {
        if (entery.start == current.start && entery.access !== false) {
          entery.access = false;
        }
      });
      worker.hours = JSON.stringify(workerHours);
      await worker.save();

      return current;
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

function subtractIntervalFromDate(timeString, interval, timeZone) {
  console.log(timeString, interval, timeZone, "timeString, interval, timeZone");
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const adjustedTime = totalMinutes - interval - timeZone * 60;
  const resultMinutes = (adjustedTime + 1440) % 1440;
  const resultHours = Math.floor(resultMinutes / 60);
  const resultMinutesPart = resultMinutes % 60;
  const result = `${(resultHours + 24) % 24}:${resultMinutesPart
    .toString()
    .padStart(2, "0")}`;
  return result;
}

function filterByCurrentHour(arr, interval, timeZone) {
  const currentTime = new Date();

  // Adjust the current time to the specified time zone
  const timeZoneOffset = new Date()
    .toLocaleTimeString("en-us", { timeZoneName: "short", timeZone: timeZone })
    .split(" ")[2];
  currentTime.setMinutes(
    currentTime.getMinutes() + parseInt(timeZoneOffset, 10)
  );

  const endTimeThreshold = new Date(
    currentTime.getTime() + 2 * interval * 60000
  );

  return arr.filter((item) => {
    // Adjust the item's end time to the specified time zone
    const itemEndTime = new Date(currentTime.toDateString() + " " + item.end);
    itemEndTime.setMinutes(
      itemEndTime.getMinutes() + parseInt(timeZoneOffset, 10)
    );

    return itemEndTime > endTimeThreshold;
  });
}

module.exports = {
  annulWorkerDates,
  generateTimeSlots,
  mergeTimeIntervals,
  removeWorkerDate,
  subtractIntervalFromDate,
  filterByCurrentHour,
};
