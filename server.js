// Dependencies
const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose')
const DATABSE_URL = 'mongodb+srv://cohall15:daeDhhfNzLEqlxGr@cluster0.skqfnxm.mongodb.net/tweeter?retryWrites=true&w=majority'

const db = mongoose.connection;

mongoose.connect(DATABSE_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})


// Database Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));



// Dependencies
const Tweet = require('./models/tweet.js');

// Middleware
// Body parser middleware: it creates req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Routes / Controllers

// Create
app.post('/tweets', (req, res) => {
	Tweet.create(req.body, (error, createdTweet) => {
        res.send(createdTweet)
    })
   
});

// Index Route
app.get('/tweets', (req, res) => {
	Tweet.find({}, (error, foundTweets) => {
		res.send(foundTweets);
	});
});


// seed route - route to quickly add bulk test data
app.get('/tweets/seed', (req, res) => {

    console.log('Hey I hit the seed route')
    Tweet.create([
        {
            "title": "Panda ",
            "body": "Its kinda cold lately",
            "author": "Sleepy Bweeee"
        },
        {
            "title": "Coco ",
            "body": "What great movie",
            "author": "Sleepy Bweeee"
        },
        {
            "title": "PS5 ",
            "body": "ohhh so much fun",
            "author": "Sleepy Bweeee"
        },
        {
            "title": "Dinner ",
            "body": "Maybe its in and out time",
            "author": "Sleepy Bweeee"
        }
    ], ( error, seededTweets) => {
        console.log(error)
        res.send(seededTweets)
    })
})

// Show Route 
app.get('/tweets/:id', (req, res) => {
	Tweet.findById(req.params.id, (error, foundTweet) => {
		res.send(foundTweet);
	});
});

// Delete Route
app.delete('/tweets/:id', (req, res) => {
	Tweet.findByIdAndDelete(req.params.id, (error, deletedTweet) => {
		res.send({ success: true });
	});
});

// Update Route
app.put('/tweets/:id', (req, res) => {
	Tweet.findByIdAndUpdate(
		req.params.id, // id of the tweet that we want to update
		req.body,//form date with the value or the updated tweet
		{ new: true },//make sure in the next function the updated tweet is changed
		(error, updatedTweet) => {
			res.send(updatedTweet);
		}
	);
});


			

// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
