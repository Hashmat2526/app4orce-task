const Task = require("../schemas/task.schema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const create = async (task) => {
  try {
    const newTask = new Task(task);
    const data = await newTask.save();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const get = async (taskId) => {
  try {
    const foundTask = await Task.findOne({ _id: new ObjectId(taskId) })
      .select(`-__v`)
      .lean()
      .exec();
    console.log({ foundTask });

    return foundTask;
  } catch (error) {
    console.log(error);
  }
};

const update = async (taskId, updObj) => {
  try {
    return await Task.findByIdAndUpdate({ _id: taskId }, { ...updObj });
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (_id) => {
  try {
    const task = await Task.deleteOne({ _id });
    return task.deletedCount;
  } catch (error) {
    console.log({ error });
  }
};

const list = async ({ page, recordsPerPage }) => {
  try {
    const tasks = await Task.find()
      .select(`-__v`)
      .skip(recordsPerPage * (page - 1))
      .limit(recordsPerPage)
      .lean()
      .exec();

    const totalCount = await Task.countDocuments().lean().exec();

    return {
      tasks,
      page,
      recordsPerPage,
      totalRecords: totalCount,
      pages: Math.floor(totalCount / recordsPerPage),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  get,
  list,
  update,
  deleteById,
};
