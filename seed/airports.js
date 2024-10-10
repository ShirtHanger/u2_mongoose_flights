

const db = require('../db')
const { Airport } = require('../models')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const airports = [
    {
      name: 'Krasnoyarsk International Airport',
      location: 'Krasnoyarsk Krai, Russia',
      code: 'KJA'
    },
    {
      name: 'King Fahd International Airport',
      location: 'Dammam, Saudi Arabia',
      code: 'DMM'
    },
    {
      name: 'Adjumani Airport',
      location: 'Adjumani, Uganda',
      code: 'HUAJ'
    },
    {
      name: 'Shanghai Pudong International Airport',
      location: 'Shanghai, China',
      code: 'PVG'
    },
    {
      name: 'Wonju Airport',
      location: 'Hoengseong County, Gangwon, South Korea',
      code: 'WJU'
    },
  ]
 

  await Airport.insertMany(airports)
  
  console.log('====================')
  console.log('Airport data created!')
  console.log('====================')
}


const run = async () => {

  await main()
  
  db.close()
}

run()