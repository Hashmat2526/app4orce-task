const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { StatusCodes } = require("http-status-codes");
const TaskService = require("../services/tasks.services");

const create = async (req, res, next) => {
  try {
    const prepObj = {
      _id: new ObjectId(),
      ...req.body,
    };

    const savedTask = await TaskService.create(prepObj);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

const get = async (req, res, next) => {
  try {
    const { taskId } = req.query;

    const task = await TaskService.get(taskId);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { taskId } = req.query;

    const task = await TaskService.deleteById(taskId);

    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

const list = async (req, res, next) => {
  try {
    const tasks = await TaskService.list({ ...req.query });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { title, taskId, description, dueDate, status } = req.body;
    const objToUpdate = {};

    if (title) {
      objToUpdate["title"] = title;
    }

    if (description) {
      objToUpdate["description"] = description;
    }

    if (dueDate) {
      objToUpdate["dueDate"] = dueDate;
    }

    if (status) {
      objToUpdate["status"] = status;
    }

    const updatedTask = await TaskService.update(taskId, objToUpdate);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};
module.exports = {
  create,
  get,
  list,
  update,
  deleteById,
};
