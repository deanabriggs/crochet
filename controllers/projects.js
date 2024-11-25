// Require resources
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Define functions for obtaining specific data
const getAllProjects = async (req, res) => {
    // #swagger.tags=['Projects']
    const result = await mongodb.getDb().db().collection('projects').find();
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projects);
    });
};

// Define functions for obtaining specific data
const getSingleProject = async (req, res) => {
    // #swagger.tags=['Projects']
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').find({_id: projectId});
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projects[0]);
    });
};

const createProject = async (req, res) => {
    // #swagger.tags=['Projects']
    const project = {
        title: req.body.title,
        category: req.body.category,
        yarnType: req.body.yarnType,
        yarnQty: req.body.yarnQty,
        needle: req.body.needle,
        picture: req.body.picture,
        pattern: req.body.pattern
    }
    const response = await mongodb.getDb().db().collection('projects').insertOne(project);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occurred while adding project.');
    }
};

const updateProject = async (req, res) => {
    // #swagger.tags=['Projects']
    const projectId = new ObjectId(req.params.id);
    const project = {
        title: req.body.title,
        category: req.body.category,
        yarnType: req.body.yarnType,
        yarnQty: req.body.yarnQty,
        needle: req.body.needle,
        picture: req.body.picture,
        pattern: req.body.pattern
    }
    const response = await mongodb.getDb().db().collection('projects').replaceOne({_id: projectId}, project);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occurred while updating project.');
    }
};

const deleteProject = async (req, res) => {
    // #swagger.tags=['Projects']
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('projects').deleteOne({_id: projectId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'An error occured while deleting project.');
    }
};

// Export Modules
module.exports = {
    getAllProjects,
    getSingleProject,
    createProject,
    updateProject,
    deleteProject
}