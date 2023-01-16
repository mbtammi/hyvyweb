const mongoose = require('mongoose')

  const dataSchema = new mongoose.Schema({
    resultOfQuery: String || "",
    wantsToStudy: String || "",
    hobbiesAndInterests: String || "",
    grades: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade'
        }
      ],
    users: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
    ],
  })

  dataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Data', dataSchema)