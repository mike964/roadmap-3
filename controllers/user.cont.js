const crud = require( '../utils/crudHandler' )
const User = require( '../models/User' )

//============================================================
// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = crud.getAll( User )
exports.getUser = crud.getOne( User )
exports.createUser = crud.createOne( User )
exports.updateUser = crud.updateOne( User )
exports.deleteUser = crud.deleteOne( User )