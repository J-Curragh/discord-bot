const Constants = exports;

Constants.CRON = {
  EVERY_MIDNIGHT: "0 0 * * *",
  EACH_MINUTE: "* * * * *",
  DEFAULT_SCHEDULE_OPTIONS: {
    scheduled: true,
    timezone: "Europe/Belfast",
  },
};

Constants.COLOURS = {
  SUCCESS: "#9bcf79",
  INFO: "#e1e3e4",
  ERROR: "#f85d7b",
};
