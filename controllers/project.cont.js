const crud = require( '../utils/crudHandler' )
const Project = require( '../models/Project' )

//============================================================
exports.createProject = crud.createOne( Project )
exports.getProjects = crud.getAll( Project )
exports.getProject = crud.getOne( Project )
exports.updateProject = crud.updateOne( Project )
exports.deleteProject = crud.deleteOne( Project )