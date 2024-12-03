// Require resources
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Define functions for obtaining specific data
const getAllProjects = async (req, res) => {
  // #swagger.tags=['Projects']
  try {
    const result = await mongodb.getDb().db().collection("projects").find();
    result.toArray().then((projects) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(projects);
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to retrieve projects.", error: e.message });
  }
};

// Define functions for obtaining specific data
const getSingleProject = async (req, res) => {
  // #swagger.tags=['Projects']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("projects")
      .find({ _id: projectId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    result.toArray().then((projects) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(projects[0]);
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to retrieve project.", error: e.message });
  }
};

const createProject = async (req, res) => {
  // #swagger.tags=['Projects']
  try {
    const { title, category, yarnType, yarnQty, needle, picture, pattern } =
      req.body;
    const project = {
      title,
      category,
      yarnType,
      yarnQty,
      needle,
      picture: picture || null,
      pattern,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("projects")
      .insertOne(project);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Project created successfully",
        project: { ...ObjectId, _id: response.insertId },
      });
    } else {
      res
        .status(500)
        .json(response.err || "An error occurred while adding project.");
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to add project.", error: e.message });
  }
};

const updateProject = async (req, res) => {
  // #swagger.tags=['Projects']
  try {
    const projectId = new ObjectId(req.params.id);
    const updateFields = req.body;

    const response = await mongodb
      .getDb()
      .db()
      .collection("projects")
      .updateOne({ _id: projectId }, { $set: updateFields });

    if (response.modifiedCount > 0) {
      res.status(200).send("Project updated successfully");
    } else {
      res
        .status(500)
        .json(response.err || "An error occurred while updating project.");
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to update project.", error: e.message });
  }
};

const deleteProject = async (req, res) => {
  // #swagger.tags=['Projects']
  try {
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("projects")
      .deleteOne({ _id: projectId });
    if (response.deletedCount > 0) {
      res.status(204).send("Project has been deleted.");
    } else {
      res
        .status(500)
        .json(response.err || "An error occured while deleting project.");
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Failed to delete project.", error: e.message });
  }
};

// Export Modules
module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
