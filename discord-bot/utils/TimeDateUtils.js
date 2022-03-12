/* Generate a random date */
exports.getRandomDate = (startDateString, endDateString) => {
    const start = Date.parse(startDateString);
    const end = Date.parse(endDateString);
    return new Date(start + Math.random() * (end - start));
};

/* Generate a random time in 24-hour format */
exports.getRandomTime = () => {
    const hours = exports.dateUnitToString(Math.floor(Math.random() * 24));
    const minutes = exports.dateUnitToString(Math.floor(Math.random() * 60));
    return `${hours}:${minutes}`;
};

/* Get current time in 24-hour format */
exports.getCurrentTime = () => {
        const date = new Date();
        const hours = exports.dateUnitToString(date.getHours());
        const minutes = exports.dateUnitToString(date.getMinutes());
        return `${hours}:${minutes}`;
};

/* Check two times are equal */
exports.areTimesEqual = (time1, time2) => {
        const [hours1, minutes1] = time1.split(":");
        const [hours2, minutes2] = time2.split(":");
        return hours1 === hours2 && minutes1 === minutes2;
};

/* Format time units X less than 10 to be 0X
 *  E.g., 9 -> 09
 */
exports.dateUnitToString = (n) => {
    const ns = n.toString();
    return (n >= 10) ? ns : "0" + ns;
};
