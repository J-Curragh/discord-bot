export default class {
  static getRandomDate(startDateString, endDateString) {
    const start = Date.parse(startDateString);
    const end = Date.parse(endDateString);
    return new Date(
      start + Math.random() * (end - start),
    );
  }
}
