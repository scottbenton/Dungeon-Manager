export const Logger = {
  debug: (eventKey: string) => {
    console.debug(`Debug: ${eventKey}`);
  },

  log: (eventKey: string) => {
    console.log(`Log: ${eventKey}`);
  },

  error: (eventKey: string) => {
    console.error(`Error: ${eventKey}`);
  },
};
