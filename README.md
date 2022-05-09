# TO ADD DUMMY DATA TO MONGODB ATLAS
this code snippet is for school project to add dummydata to database. 
## TECHS used
- MongoDB Atlas
- faker

## To use
- Add your database URL to .env file to project root and name it 
```js
DATABASE_URL=
```  

- Copy the database name from URL to the variables in mongoSeed.js  

- Change the values (quantity, date range, how many words to the comment) to match your need.   


### Check survey ID -- needed for our project 
- change correct ID so that data is matching 


### To run the code 
```bash
npm start
```

## NOTE 
- db.close() does not work 
