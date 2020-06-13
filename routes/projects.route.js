const express = require( 'express' )
const { protect, restrictedTo } = require( '../middleware/auth.mdlwr' )
const { setUser, checkProjectUser, setProject } = require( '../middleware/moslm-mdlwrs' )
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require( '../controllers/project.cont' )
const stepRouter = require( './steps.route' )



//==========================================================
const router = express.Router()

router.use( protect )
// All routes below will use the two middlewares above

router
  .route( '/' )
  // .get( restrictedTo( 'admin' ), getProjects )
  .get( getProjects )
  .post( setUser, createProject )

router.route( '/my-projects' )
  .get( setUser, getProjects )

router.route( '/:id' )
  .get( checkProjectUser, getProject )
  .patch( checkProjectUser, updateProject )
  .delete( checkProjectUser, deleteProject )

// Get Steps of a Project - Re-route into other router
router.use( '/:projectId/steps', checkProjectUser, stepRouter )
router.use( '/steps', stepRouter )


module.exports = router