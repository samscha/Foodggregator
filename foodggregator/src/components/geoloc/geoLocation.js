const checkGeoLoc = position => {
  //
};

const getGeoLoc = position => {
  geoLoc.lat = position.coords.latitude;
  geoLoc.lng = position.coords.longitude;
};

const error = _ => {
  return 'Position not available.';
};

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const geoLoc = {
  lat: -1,
  lng: -1,
};

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
function prompt(window, pref, message, callback) {
  let branch = Components.classes[
    '@mozilla.org/preferences-service;1'
  ].getService(Components.interfaces.nsIPrefBranch);

  if (branch.getPrefType(pref) === branch.PREF_STRING) {
    switch (branch.getCharPref(pref)) {
      case 'always':
        return callback(true);
      case 'never':
        return callback(false);
    }
  }

  let done = false;

  function remember(value, result) {
    return function() {
      done = true;
      branch.setCharPref(pref, value);
      callback(result);
    };
  }

  let self = window.PopupNotifications.show(
    window.gBrowser.selectedBrowser,
    'geolocation',
    message,
    'geo-notification-icon',
    {
      label: 'Share Location',
      accessKey: 'S',
      callback: function(notification) {
        done = true;
        callback(true);
      },
    },
    [
      {
        label: 'Always Share',
        accessKey: 'A',
        callback: remember('always', true),
      },
      {
        label: 'Never Share',
        accessKey: 'N',
        callback: remember('never', false),
      },
    ],
    {
      eventCallback: function(event) {
        if (event === 'dismissed') {
          if (!done) callback(false);
          done = true;
          window.PopupNotifications.remove(self);
        }
      },
      persistWhileVisible: true,
    },
  );
}

prompt(
  window,
  'extensions.foo-addon.allowGeolocation',
  'Foo Add-on wants to know your location.',
  function callback(allowed) {
    alert(allowed);
  },
);

module.exports = { prompt };
