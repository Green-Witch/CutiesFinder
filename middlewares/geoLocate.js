const geoip = require("geoip-lite");

const geo_locate = (req, res, next) => {
  try {
    const data = geoip.lookup(req.ip);
    req.geo_data = data;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = geo_locate;
