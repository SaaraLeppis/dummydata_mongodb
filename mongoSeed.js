// require the necessary libraries
const faker = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
require('dotenv').config();

// remember to add database url (as DATABASE_URL) to .env file
const mongodbURI = process.env.DATABASE_URL;

// ## change following variables ##    
// set needed values
const resultsQty = 15;
const commentWords = 3;
//set dates yyyy-mm-dd as string
const dateStart = '2020-01-08'
const dateEnd = '2022-05-09'

const targetDatabase = 'NPSDB'; //in our usecase
const targetCollection = 'scores'; // in our usecase

// set the id of survey which data you want to create, as string 
const idOfSelectdSurvey = "6276c7bce2901775bfbb84aa";  // neede in our usecase

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = mongodbURI;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const surveyid = ObjectId(idOfSelectdSurvey);


    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db(targetDatabase).collection(targetCollection);


        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        // collection.drop();

        // make dummy data
        let scoreResults = [];
        let scoreResultsByDate = []

        const sorting = () => {
            scoreResultsByDate = scoreResults.sort((a, b) => a.date - b.date).reverse()
        }

        for (let j = 0; j < resultsQty; j += 1) {
            let newResult = {
                score: randomIntFromInterval(1, 10),
                comment: faker.faker.lorem.words(commentWords),
                date: faker.faker.date.between(dateStart, dateEnd),
                _id: ObjectId(faker.faker.database.mongodbObjectId())
            }
            scoreResults.push(newResult);
        }
        // data needs to be sorted by date to our useCase
        sorting();
        collection.insertOne({
            surveyID: surveyid,
            results: scoreResultsByDate,
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 0
        });

        console.log("Database seeded! :)");

        //client.close();   // throws errors if close() used 
    } catch (err) {
        // with following you can get the BulkWriteerrors name
        if ("name" in err && err.name == 'BulkWriteError') {
            var wErrors = err.getWriteErrors();
            wErrors.forEach(function (doc) {
                db.errlog.insert(doc);
            });
        }
        console.log("this error", err.stack);
    }
}

seedDB();