var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://mzapps-locator.herokuapp.com";
}

/*General utility function to hit the api and get a single location data*/
var getLocationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;


  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };

  request(requestOptions, function (err, response, body) {
    var data = body;
    if (response.statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

var renderHomepage = function (req, res) {

  res.render('locations-list', {
    title: 'LocatoR - find a place to work with fast wifi',
    pageHeader: {
      title: 'LocatoR',
      strapline: 'Find places to work with fast wifi near you!'

    },
    sidebar: "Looking for wifi and a seat? LocatoR helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let LocatoR help you find the place you're looking for."

  });
};

/*GET 'home' page*/
module.exports.homelist = function (req, res) {
  renderHomepage(req, res);
};


/* GET 'Location info' page */
var renderDetailPage = function (req, res, locDetail) {
  res.render('location-info', {
    location: locDetail,
    title: locDetail.name,
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been there and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    pageHeader: {
      title: locDetail.name
    }

  });
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
};


module.exports.locationInfo = function (req, res) {
  getLocationInfo(req, res, function (req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};


/*GET 'Add review' page*/
var renderReviewForm = function (req, res, locDetail) {
  res.render('location-review-form', {
    title: 'Review ' + locDetail.name + ' on LocatoR',
    location: locDetail,
    error: req.query.err,
    url: req.originalUrl,
    pageHeader: {
      title: 'Review ' + locDetail.name
    }
  });
};


module.exports.addReview = function (req, res) {

  getLocationInfo(req, res, function (req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};


/*POST */
module.exports.doAddReview = function (req, res) {
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(
      requestOptions,
      function (err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};