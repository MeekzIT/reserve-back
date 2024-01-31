const Worker = require("../models").Worker;
const Boxes = require("../models").Box;

function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

function generateTimeSlots(startHour, endHour, interval) {
  const result = [];

  // Convert startHour and endHour to Date objects
  const startDate = new Date(`2022-01-01T${startHour}:00`);
  const endDate = new Date(`2022-01-01T${endHour}:00`);

  // Calculate the number of intervals
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
    };

    result.push(timeSlot);
  }

  return result;
}

const annulWorkerDates = async (req, res) => {
  try {
    const allWorkers = await Worker.findAll();
    Promise.all(
      await allWorkers.map(async (item) => {
        const box = await Boxes.findOne({ where: { id: boxId } });
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

module.exports = {
  annulWorkerDates,
  generateTimeSlots,
};
