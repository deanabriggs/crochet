// Require resources
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Define functions for obtaining specific data
const getAllContributors = async (req, res) => {
    // #swagger.tags=['Contributors']
    const result = await mongodb.getDb().db().collection('contributors').find();
    result.toArray().then((contributors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contributors);
    });
};

// Define functions for obtaining specific data
const getSingleContributor = async (req, res) => {
    // #swagger.tags=['Contributors']
    const contributorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contributors').find({_id: contributorId});
    result.toArray().then((contributors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contributors[0]);
    });
};

const createContributor = async (req, res) => {
    // #swagger.tags=['Contributors']
    const contributor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        joinDate: req.body.joinDate,
        numOfProj: req.body.numOfProj,
        qtyFollows: req.body.qtyFollows
    }
    const response = await mongodb.getDb().db().collection('contributors').insertOne(contributor);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occurred while adding contributor.');
    }
};

const updateContributor = async (req, res) => {
    // #swagger.tags=['Contributors']
    const contributorId = new ObjectId(req.params.id);
    const contributor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        joinDate: req.body.joinDate,
        numOfProj: req.body.numOfProj,
        qtyFollows: req.body.qtyFollows
    }
    const response = await mongodb.getDb().db().collection('contributors').replaceOne({_id: contributorId}, contributor);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occurred while updating contributor.');
    }
};

const deleteContributor = async (req, res) => {
    // #swagger.tags=['Contributors']
    const contributorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contributors').deleteOne({_id: contributorId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occured while deleting contributor.');
    }
};

// Export Modules
module.exports = {
    getAllContributors,
    getSingleContributor,
    createContributor,
    updateContributor,
    deleteContributor
}