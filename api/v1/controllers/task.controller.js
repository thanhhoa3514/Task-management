const Task = require("../models/task.model");
const paginationHelpers = require("../../../helpers/pagination");
const searchHelpers = require("../../../helpers/search");
// [GET] /api/v1/tasks
module.exports.index = async (req, res, next) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
    res.json(task);
  }

  const objectSearch = searchHelpers(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }


  const countTotalItems = await Task.countDocuments(find);

  let objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItems: 2,
    },
    req.query,
    countTotalItems
  );
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const task = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.json(task);
};

// [GET] /api/v1/tasks/:id

module.exports.detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json(error);
  }
};



// [GET] api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res, next) => {
  try {

    const id = req.params.id;

    const status = req.body.status;
    await Task.updateOne({
      _id: id,

    }, {
      status: status
    })
    res.json({
      code: 200,
      message: "Change status success",
    })
  }
  catch (error) {
    res.json({
      code: 400,
      message: "Change status failed",
    });
  }
}


// [PATCH] api/v1/tasks/change-multi
module.exports.changeStatusMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "status":
        await Task.updateMany({
          _id: { $in: ids },

        }, {
          status: value
        });
        res.json({
          code: 200,
          message: "Change status multi success",
        });
        break;
      case "delete":
        await Task.updateMany({
          _id: {
            $in: ids
          }
        }, {
          delete: true,
          deletedAt: new Date()
        })
        res.json({
          code: 200,
          message: "Delete status multi success",
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Not implemented",
        });
        break;
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Change status multi failed",
    });
  }
};

// [POST] api/v1/tasks/create
module.exports.createTask = async (req, res) => {

  try {
    req.body.createdBy=req.user.id;
    const task = new Task(req.body);
    const data = await task.save();

    res.json({
      code: 200,
      message: "Created task successfully",
      data: data
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Create task failed",
    });
  }

};

// [PATCH] api/v1/tasks/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findOne({
      _id: id,
    }, req.body);
    res.json({
      code: 200,
      message: "Task has been edited successfully",
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Something went wrong",
    })
  }

};

// [DELETE] api/v1/tasks/delete
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: new Date()
    })

    res.json({
      code: 200,
      message: "Task has been deleted successfully",
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Something went wrong",
    })
  }
};