// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

const calcDistBetw = (loc1, loc2) => {
  const radius = 6371;

  const lat = convertToRad(loc2.lat - loc1.lat);
  const lng = convertToRad(loc2.lng - loc1.lng);
  const a =
    Math.pow(Math.sin(lat / 2), 2) +
    Math.cos(convertToRad(loc1.lat)) *
      Math.cos(convertToRad(loc2.lat)) *
      Math.pow(Math.sin(lng / 2), 2);
  const c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(radius * c * 100) / 100;
};

const convertToRad = deg => {
  return deg * (Math.PI / 180);
};

export { calcDistBetw };
