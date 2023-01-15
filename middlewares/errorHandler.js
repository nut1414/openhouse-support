export class StatusError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(error);
      if (error instanceof StatusError) {
        return res.status(error.status).json({ error: error.message });
      }else return res.status(500).json({ error: "Internal server error" });
    }
  };
}