// Require resources
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Define functions for obtaining specific data
const getAllContributors = async (req, res) => {
  // #swagger.tags=['Contributors']
  try {
    const result = await mongodb.getDb().db().collection("contributors").find();
    result.toArray().then((contributors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contributors);
    });
  } catch (e) {
    console.error(e);
  }
};

// Define functions for obtaining specific data
const getSingleContributor = async (req, res) => {
  // #swagger.tags=['Contributors']
  try {
    const contributorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contributors")
      .find({ _id: contributorId });
    result.toArray().then((contributors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contributors[0]);
    });
  } catch (e) {
    console.error(e);
  }
};

const createContributor = async (req, res) => {
  // #swagger.tags=['Contributors']
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      joinDate,
      numOfProj,
      qtyFollows,
    } = req.body;
    const contributor = {
      firstName,
      lastName,
      email,
      phone,
      joinDate,
      numOfProj,
      qtyFollows: qtyFollows || 0,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contributors")
      .insertOne(contributor);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Contributor created successfully",
        contributor: { ...contributor, _id: response.insertedId },
      });
    } else {
      res
        .status(500)
        .json(response.err || "An error occurred while adding contributor.");
    }
  } catch (e) {
    console.error(e);
  }
};

const updateContributor = async (req, res) => {
  // #swagger.tags=['Contributors']
  try {
    const contributorId = new ObjectId(req.params.id);
    const updateFields = req.body;

    const response = await mongodb
      .getDb()
      .db()
      .collection("contributors")
      .updateOne({ _id: contributorId }, { $set: updateFields });

    if (response.modifiedCount > 0) {
      res.status(200).send("Contributor updated successfully");
    } else {
      res
        .status(500)
        .json(response.err || "An error occurred while updating contributor.");
    }
  } catch (e) {
    console.error(e);
  }
};

const deleteContributor = async (req, res) => {
  // #swagger.tags=['Contributors']
  try {
    const contributorId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("contributors")
      .deleteOne({ _id: contributorId });
    if (response.deletedCount > 0) {
      res.status(204).send("Contributor has been deleted.");
    } else {
      res
        .status(500)
        .json(response.err || "An error occured while deleting contributor.");
    }
  } catch (e) {
    console.error(e);
  }
};

// Export Modules
module.exports = {
  getAllContributors,
  getSingleContributor,
  createContributor,
  updateContributor,
  deleteContributor,
};
