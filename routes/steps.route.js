const express = require( 'express' )
const {
  getSteps,
  getStep,
  createStep,
  updateStep,
  deleteStep
} = require( '../controllers/step.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )
const {
  setUser, checkProjectUser, checkStepUser, setProject
} = require( '../middleware/moslm-mdlwrs' )

//====================================================================
const router = express.Router( { mergeParams: true } )



//=========================================================
// app.use( '/api/v1/steps' )
router
  .route( '/' )
  .get( protect, checkProjectUser, setProject, getSteps )
  .post( protect, checkProjectUser, setProject, createStep )

router
  .route( '/:stepId' )
  .get( checkStepUser, getStep )
  .patch( checkStepUser, updateStep )
  .delete( checkStepUser, deleteStep )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router