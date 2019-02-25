const mongooseConnect = require('../../common/config/connect.config');
const mongoose = mongooseConnect.connect();
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: Boolean,
    createdBy: ObjectId,
    createdDate: { type : Date, default: Date.now }
});

taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
taskSchema.set('toJSON', {
    virtuals: true
});

taskSchema.findById = function (cb) {
    return this.model('Tasks').find({id: this.id}, cb);
};

const Task = mongoose.model('Tasks', taskSchema);

exports.findById = (id) => {
    return Task.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createTask = (taskData) => {
    const task = new Task(taskData);
    return task.save();
};

exports.list = (perPage, page, userId) => {
    return new Promise((resolve, reject) => {
        Task.find({createdBy: userId})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, tasks) {
                if (err) {
                    reject(err);
                } else {
                    resolve(tasks);
                }
            })
    });
};

exports.patchTask = (id, taskData) => {
    return new Promise((resolve, reject) => {
        Task.findById(id, function (err, task) {
            if (err) reject(err);
            for (let i in taskData) {
                task[i] = taskData[i];
            }
            task.save(function (err, updatedTask) {
                if (err) return reject(err);
                resolve(updatedTask);
            });
        });
    })

};

exports.removeById = (taskId) => {
    return new Promise((resolve, reject) => {
        Task.remove({_id: taskId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

