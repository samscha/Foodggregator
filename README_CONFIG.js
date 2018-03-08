module.exports = {
  port: 3030,
  status: {
    OK: 200,
    USER_ERROR: 422,
    SERVER_ERROR: 500,
  },
  APIs: {
    googleplaces: {
      urls: {
        textsearch: 'https://maps.googleapis.com/maps/api/place/textsearch',
        details: 'https://maps.googleapis.com/maps/api/place/details',
        geocode: 'https://maps.googleapis.com/maps/api/geocode',
        photos: 'https://maps.googleapis.com/maps/api/place/photo',
      },
      output: 'json',
      key: 'API_KEY_HERE',
    },
    yelp: {
      urls: {
        search: 'https://api.yelp.com/v3/businesses/search',
      },
      key: 'API_KEY_HERE',
    },
  },
  useMongodAuth: false,
  mongodAuth: {
    user: 'USER_HERE',
    pass: 'PASSWORD_HERE',
    authSource: 'AUTHENTICATION-DB_HERE',
  },
  MATCH_PERCENT_THRESHOLD: 0.85,
};
