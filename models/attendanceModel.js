const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const attendanceSchema = new Schema ({
    date : {
        type : String,
        required : true
    },
    roll_number : {
        type : String,
        required : true
    }    ,
    present : {
        type : String,
        required : true
    }
 }, { timestamps : true })

module.exports = mongoose.model ('attendance',attendanceSchema);

