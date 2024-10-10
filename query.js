const db = require('./db')
const { Flight, Airport } = require('./models')


/* User Story 1 */

const listFlights = async () => {
    const flights = await Flight.find().populate('departingAirport')
    for (flight of flights) {
        console.log(`
            [${flight.departingAirport.name}]
            [flight #${flight.flight_number}] 
            Airline: ${flight.airline} 
            Departure: ${flight.departure_date_time}
            `)
        /* Assistance from ChatGPT */
        /* I wrote this code out on my own, but I kept getting undefined or the
        raw object ID, until GPT suggested I rename "airport_id" in
        the flights Schema in model/flight.js to "Airport" */
        /* https://chatgpt.com/share/67073193-2fb0-8012-9bd9-4a435a8d8742 */
}
}

/* User Story 2 */

const checkFlightByID = async (flightID) => {
    let foundFlight = await Flight.findById(flightID)
    console.log(`
        flight #${foundFlight.flight_number} by ${foundFlight.airline} is departing at ${foundFlight.departure_date_time}
        `)
}

const checkAirportByID = async (airportID) => {
    const foundAirport = await Airport.findById(airportID)
    console.log(`
        ${foundAirport.name} - (${foundAirport.code}) is located in ${foundAirport.location}
        `)
}

/* User Story 3 */

const createFlight = async (
    newAirline, newFlightNumber, newPrice, 
    newSeats, newDeparting, newArrival, 
    newDepartureDateTime) => {
    const departAirport = await Airport.findOne({name: newDeparting })
    const arriveAirport = await Airport.findOne({name: newArrival })

  let flight = await Flight.create({
      airline: newAirline,
      flight_number: newFlightNumber,
      price: newPrice,
      numberOfSeats: newSeats,
      departingAirport: departAirport._id,
      arrivalAirport: arriveAirport._id,
      departure_date_time: newDepartureDateTime
  })
  console.log(flight)
    }

/* User Story 4 */

/* Discovered "findByIdAndUpdate" and "returnNewDocument" here https://www.mongodb.com/developer/products/mongodb/cheat-sheet/ */

/* I keep getting an error with these claiming I am not connected, even though my other functions work just fine */
/* MongoNotConnectedError: Client must be connected before running operations
    at autoConnect */

/* The errors were solved by commenting out "await db.close()" (?????) */
/* https://www.mongodb.com/community/forums/t/getting-this-error-mongonotconnectederror-client-must-be-connected-before-running-operations/219680/2 */
/* https://stackoverflow.com/questions/68889304/mongonotconnectederror-i-was-trying-to-post-data-to-mongodb-and-this-error-o */

const updateAirport = async (targetId, newName, newLocation, newCode) => {
    const targetedAirport = await Airport.findByIdAndUpdate(targetId, { 
            name: newName, 
            location: newLocation, 
            code: newCode 
        }, 
        { returnNewDocument: true } 
)
  
  console.log(targetedAirport)
}

const updateFlight = async (targetId, newAirline, newFlightNumber, 
    newPrice, 
    newSeats, newDeparting, 
    newArrival, 
    newDepartureDateTime) => {
        const departAirport = await Airport.findOne({name: newDeparting })
        const arriveAirport = await Airport.findOne({name: newArrival })

        const targetedFlight = await Flight.findByIdAndUpdate(targetId, {
                airline: newAirline,
                flight_number: newFlightNumber,
                price: newPrice,
                numberOfSeats: newSeats,
                departingAirport: departAirport._id,
                arrivalAirport: arriveAirport._id,
                departure_date_time: newDepartureDateTime
        }, { returnNewDocument: true } 
    )
        console.log(targetedFlight)
}

/* User Story 5 */

const deleteFlight = async (targetFlightNumber) => {
  let deleted = await Flight.deleteOne({ flight_number: targetFlightNumber })
  console.log(deleted)
}

/* Making a new Airport for the sole purpose of deleting it, because I
do not want to break my database */

const createDummyAirport = async (newName, newLocation, newCode) => {
    let airport = Airport.create({
        name: newName,
        location: newLocation,
        code: newCode
    })
    console.log(airport)
}

const deleteAirport = async (targetName) => {
    let deleted = await Airport.deleteOne({ name: targetName })
    console.log(deleted)
  }

async function main() {
  try {

    await listFlights()

    await checkFlightByID('67072af0ad5a72581b0b8e80') // True Arabian
    await checkAirportByID('67072ae6186c19ea75e8564a') // King Fahd
    
    await createFlight('Alchemax Airlines', 2099, 799.99, 690, 
       'Wonju Airport', 'Shanghai Pudong International Airport',  
      '2099-11-15 19:42 UTC')

    updateAirport('67072ae6186c19ea75e8564d', // Should target Wonju
        'Wonju Airport',
        'Gangwon, South Korea',
        'WJU'
    )
    updateFlight('67074194e1af847e0b59d30d', // Should target Alchemax
        'Alchemax Airlines', 2099, 899.99, 790, 
        'Wonju Airport', 'Adjumani Airport',  
       '2099-11-16 02:50 UTC'
    )

    deleteFlight(2099) // Should delete Alchemax Airlines flight
    createDummyAirport('Alchemax Airport', 'Nueva York', 'ALX')
    deleteAirport('Alchemax Airport')

  } catch (error) {
      console.log(error)
  } finally {
    await db.close() /* User Stories 4-5 REFUSE TO WORK unless this is commented out (????) */
  }
}

main()