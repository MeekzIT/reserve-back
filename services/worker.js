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
        await item.update({
          hours: String(
            generateTimeSlots(item.startHour, item.endHour, box.interval)
          ),
        });
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
          console.log(entery.start, current.start);

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

module.exports = {
  annulWorkerDates,
  generateTimeSlots,
  mergeTimeIntervals,
  removeWorkerDate,
};
