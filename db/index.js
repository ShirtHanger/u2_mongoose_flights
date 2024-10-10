const mongoose = require('mongoose')


mongoose.connect( // Place YOUR connection string with the password. Before the ?, enter desired database name
  'mongodb+srv://shirt-skunk-63:<insert-password>@ga-student-cluster.6hjot.mongodb.net/flightsDatabase?retryWrites=true&w=majority&appName=ga-student-cluster'
) // Local connection host
.then(()=> {
  console.log('Successfully connected to MongoDB!')
})
.catch((e) => {
  console.error('Connection error', e.message)
})
    
mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db