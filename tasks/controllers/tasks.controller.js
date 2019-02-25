const TaskModel = require('../models/tasks.model');

exports.insert = async (req, res) => {
    try {
        let userId = req.jwt.userId;
        req.body.createdBy = userId;
        let result = await TaskModel.createTask(req.body);
        res.status(201).send({ id: result._id });
    } catch (err) {
        res.status(400).send({ error: "Invalid Request" });
    }
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    TaskModel.list(limit, page, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    TaskModel.findById(req.params.taskId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    TaskModel.patchTask(req.params.taskId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    TaskModel.removeById(req.params.taskId)
        .then((result) => {
            res.status(204).send({});
        });
};