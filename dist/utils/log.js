"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const getTimeAndDate = () => {
  const date = new Date();
  return `${date.toDateString()} ${date.toTimeString()}`;
};
const createMessage = (type, message) => {
  return `[${getTimeAndDate()}] ${type.toUpperCase()}: ${message}`;
};
exports.log = {
  info: (message) => console.info(createMessage("info", message)),
  error: (message) => console.error(createMessage("error", message)),
  warn: (message) => console.warn(createMessage("warn", message)),
  debug: (message) => console.debug(createMessage("debug", message)),
};
