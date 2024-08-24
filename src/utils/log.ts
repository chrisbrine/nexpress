const getTimeAndDate = (): string => {
  const date = new Date();
  return `${date.toDateString()} ${date.toTimeString()}`;
};

const createMessage = (type: string, message: string): string => {
  return `[${getTimeAndDate()}] ${type.toUpperCase()}: ${message}`;
};

export const log = {
  info: (message: string) => console.info(createMessage("info", message)),
  error: (message: string) => console.error(createMessage("error", message)),
  warn: (message: string) => console.warn(createMessage("warn", message)),
  debug: (message: string) => console.debug(createMessage("debug", message)),
};
