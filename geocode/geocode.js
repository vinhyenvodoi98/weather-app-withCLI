const request = require('request');

var geocodeAddress = async (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  try{
    await request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },(error, response, body) => {
      if (error) {
        callback('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address.');
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    })
  }catch(error)
  {
    console.log('error geocodeaddress');
  }
};

module.exports.geocodeAddress = geocodeAddress;
