var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://ancient-reaches-88437.herokuapp.com/";
}

var renderHomepage = function (req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', {
    title: 'LocatoR - find a place to work with fast wifi',
    pageHeader: {
      title: 'LocatoR',
      strapline: 'Find places to work with fast wifi near you!',
      locations: responseBody,
      sidebar: "Looking for wifi and a seat? LocatoR helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let LocatoR help you find the place you're looking for.",
      message: message
    }

  });
};


/*GET 'home' page*/
module.exports.homelist = function (req, res) {
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng: -1.7703437000000122,
      lat: 53.674278799999996,
      maxdist: 20
    }

  };

  request(requestOptions, function (err, response, body) {
    var i, data;
    data = body;
    if (response.statusCode === 200 && data.length) {
      for (i = 0; i < data.length; i++) {
        data[i].distance = _formatDistance(data[i].distance);
      }
    }
    renderHomepage(req, res, body);
  });
};

//Utility function to format the output distance into km or m
var _formatDistance = function (distance) {
  var numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'km';
  } else {
    numDistance = parseInt(distance * 1000, 10);
    unit = 'm';
  }
  return numDistance + unit;
};

/* GET 'Location info' page */
var renderDetailPage = function (req, res, locDetail) {
  console.log("locDetail.coords is: ", locDetail.coords);
  res.render('location-info', {
    location: locDetail,
    title: locDetail.name,
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },

    pageHeader: {
      
      title: locDetail.name

    }
    
  });
};
module.exports.locationInfo = function (req, res) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  console.log("************************************************");
  console.log("req.params.locationid is:------->>>>> " + req.params.locationid);
  console.log("************************************************");

  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };

  request(requestOptions, function (err, response, body) {

    var data = body;
    data.coords = {
      lng: body.coords[0],
      lat: body.coords[1]
    };
    renderDetailPage(req, res, data);
    console.log("---------------*******-------------------");

    console.log("response is --->>>>>> " + response + '\n');
    console.log("body is --->>>>>> " + body + '\n');
    //    for (a in body)
    //      console.log("property in body is: ", a);
    //    for (a in response)
    //      console.log("property in response is: ", a);
    console.log("body.coords is: ", body.coords);

    console.log("---------------*******-------------------");


  });
};

/*GET 'Add review' page*/
module.exports.addReview = function (req, res) {
  res.render('location-review-form', {
    title: 'Add review'
  });
};