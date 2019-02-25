const mongoose = require('mongoose');
exports.connect = () => {
    mongoose.connect('mongodb://todoadmin:todoadmin@localhost:27017/todo');
    return mongoose;
}