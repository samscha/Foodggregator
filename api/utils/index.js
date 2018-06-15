module.exports = (res, data, message, status = 200) => {
  res.status(status).send({ data, message });
};
