

export const handle = (error, res) => {
  if (error instanceof CustomError && !error.isServerError) {
    return res.status(error.code).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Internal Server Error.' });
};
