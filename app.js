const express = require('express')
const app = require('express')()
const port = 1337
const Twit = require('twit');
const config = require('./config/config.js');
const T = new Twit(config);

const stream = T.stream('statuses/filter', {
	track: ['champions league']
});

let tweetCount = 0

stream.on('tweet', (tweets) => {
	tweetCount++
	console.log(tweetCount)
});

app
	.set('view engine', 'pug')
	.use(express.static('public'))
	.get('/', (req, res) => {
		res.render('index', {
			tweetCount
		})

	})
	.listen(process.env.PORT || port, () => {
		console.log('Started server on http://localhost:' + port)
	})