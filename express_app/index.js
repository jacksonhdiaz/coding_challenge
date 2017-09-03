
const twit = require('twit')
const auth = require('./authentication')
const twitter = new twit(auth)
const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/:id', function (req, res) {
	twitter.get('search/tweets', { q: encodeURIComponent(req.params.id), count: 500 }, function(err, data, response) {
		try {
        	res.json(data.statuses)
    	} catch (exeception) {
        	res.send(404)
    	}
	})
})

app.listen(3000, function () {
  console.log('Listening on port 3000!') 
})
