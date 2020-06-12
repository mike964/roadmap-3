// const ErrorResponse = require( '../utils/errorResponse' )
// const asyncHandler = require( '../middleware/async.mdlwr' )
const Step = require( '../models/Step' )
const crud = require( '../utils/crudHandler' )

//==========================================================
// @desc      Get all Steps
// @route     GET /api/v1/auth/Steps
// @access    Private/Admin
exports.getSteps = crud.getAll( Step, [ 'project', '  title' ] )

// @desc      Get single Step
// @route     GET /api/v1/auth/Steps/:id
// @access    Private/Admin
exports.getStep = crud.getOne( Step, [ 'project', 'title user' ] )

// @desc      Create Step
// @route     POST /api/v1/auth/Steps
// @access    Private/Admin
exports.createStep = crud.createOne( Step )

// @desc      Update Step
// @route     PUT /api/v1/auth/Steps/:id
// @access    Private/Admin
exports.updateStep = crud.updateOne( Step )

// @desc      Delete Step
// @route     DELETE /api/v1/auth/Steps/:id
// @access    Private/Admin
exports.deleteStep = crud.deleteOne( Step )