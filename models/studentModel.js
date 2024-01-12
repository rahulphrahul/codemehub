const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    roll_number : {
        type : String,
        required : true
    }
 }, { timestamps : true })

module.exports = mongoose.model ('student',studentSchema);

