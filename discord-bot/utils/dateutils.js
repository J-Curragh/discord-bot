export default class {
  static getRandomDate(startDateString, endDateString) {
    const start = Date.parse(startDateString);
    const end = Date.parse(endDateString);
    return new Date(
      start + Math.random() * (end - start),
    );
  }

  // Generate a random time in 24-hour format
  static getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${this.dateUnitToString(hours)}:${this.dateUnitToString(minutes)}`;
  }

  // Get current time in 24-hour format
  static getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${this.dateUnitToString(hours)}:${this.dateUnitToString(minutes)}`;
  }

  // Check two times are equal
  static areTimesEqual(time1, time2) {
    const [hours1, minutes1] = time1.split(":");
    const [hours2, minutes2] = time2.split(":");
    return hours1 === hours2 && minutes1 === minutes2;
  }

  static dateUnitToString(n) {
    const ns = n.toString();
    return (n >= 10) ? ns : "0" + ns;
  };
}
