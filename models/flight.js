const { Schema } = require('mongoose')

const Flight = new Schema(
  {
    airline: { type: String, required: true },
    flight_number: { type: String, required: true },
    price: { type: Number, required: true },
    numberOfSeats: { type: Number, required: true },
    departingAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
    arrivalAirport: { type: Schema.Types.ObjectId, ref: 'Airport' },
    /* Assistance from ChatGPT */
        /* See query.js, it suggested I rename "airport_id" in
        the flights Schema to "Airport" to accomplish first user Story */
        /* https://chatgpt.com/share/67073193-2fb0-8012-9bd9-4a435a8d8742 */
    departure_date_time: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = Flight