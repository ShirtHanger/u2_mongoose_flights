const db = require('../db')
const { Airport, Flight } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const krasnoyarskAirport = await Airport.find({ name: 'Krasnoyarsk International Airport' })
  const kingFahdAirport = await Airport.find({ name: 'King Fahd International Airport' })
  const adjumaniAirport = await Airport.find({ name: 'Adjumani Airport' })
  const shanghaiAirport = await Airport.find({ name: 'Shanghai Pudong International Airport' })
  const wonjuAirport = await Airport.find({ name: 'Wonju Airport' })

  const flights = [
    {
        airline: 'Lizard Wings',
        flight_number: 1882,
        price: 314.99,
        numberOfSeats: 100,
        departingAirport: krasnoyarskAirport[0]._id,
        arrivalAirport: shanghaiAirport[0]._id,
        departure_date_time: '2002-06-27 03:42 UTC',
    },
    {
        airline: 'Gemstone Flights',
        flight_number: 1910,
        price: 260.99,
        numberOfSeats: 112,
        departingAirport: adjumaniAirport[0]._id,
        arrivalAirport: krasnoyarskAirport[0]._id,
        departure_date_time: '2002-07-12 13:01 UTC',
    },
    {
        airline: 'American Eagle Airlines',
        flight_number: 1932,
        price: 200.99,
        numberOfSeats: 148,
        departingAirport: wonjuAirport[0]._id,
        arrivalAirport: kingFahdAirport[0]._id,
        departure_date_time: '2002-07-17 10:01 UTC',
    },
    {
        airline: 'Lizard Wings',
        flight_number: 1957,
        price: 340.99,
        numberOfSeats: 96,
        departingAirport: adjumaniAirport[0]._id,
        arrivalAirport: krasnoyarskAirport[0]._id,
        departure_date_time: '2002-08-03 03:59 UTC',
    },
    {
        airline: 'United African Flights',
        flight_number: 1971,
        price: 500.99,
        numberOfSeats: 50,
        departingAirport: wonjuAirport[0]._id,
        arrivalAirport: adjumaniAirport[0]._id,
        departure_date_time: '2002-08-13 23:49 UTC',
    },
    {
        airline: 'Flying Feline Flights',
        flight_number: 1986,
        price: 150.99,
        numberOfSeats: 180,
        departingAirport: adjumaniAirport[0]._id,
        arrivalAirport: shanghaiAirport[0]._id,
        departure_date_time: '2002-08-29 17:31 UTC',
    },
    {
        airline: 'United African Flights',
        flight_number: 1990,
        price: 160.99,
        numberOfSeats: 160,
        departingAirport: shanghaiAirport[0]._id,
        arrivalAirport: kingFahdAirport[0]._id,
        departure_date_time: '2002-09-05 23:30 UTC',
    },
    {
        airline: 'Kettlstone Arrows',
        flight_number: 2006,
        price: 260.99,
        numberOfSeats: 106,
        departingAirport: wonjuAirport[0]._id,
        arrivalAirport: kingFahdAirport[0]._id,
        departure_date_time: '2002-09-13 14:55 UTC',
    },
    {
        airline: 'China Southern Airlines',
        flight_number: 2014,
        price: 245.99,
        numberOfSeats: 112,
        departingAirport: kingFahdAirport[0]._id,
        arrivalAirport: krasnoyarskAirport[0]._id,
        departure_date_time: '2002-09-08 11:00 UTC',
    },
    {
        airline: 'True Arabian Jets',
        flight_number: 2036,
        price: 205.99,
        numberOfSeats: 134,
        departingAirport: krasnoyarskAirport[0]._id,
        arrivalAirport: kingFahdAirport[0]._id,
        departure_date_time: '2002-10-15 01:01 UTC',
    },
  ]

  await Flight.insertMany(flights)

  console.log('====================')
  console.log('Flight data created!')
  console.log('====================')
}
const run = async () => {
  await main()
  db.close()
}

run()