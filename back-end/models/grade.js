const mongoose = require('mongoose')

  const gradeSchema = new mongoose.Schema({
    name: String,
    grade: Number || 0,
    datas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Data'
      }
    ],
    users: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
    ],
    
  })

  gradeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Grade', gradeSchema)