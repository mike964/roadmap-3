const express = require( 'express' )
const { protect, restrictedTo } = require( '../middleware/auth.mdlwr' )
const {
  createUser,
  getUsers
} = require( '../controllers/user.cont' )
const { getSteps
} = require( '../controllers/step.cont' )
const userRouter = require( './users.route' )

//=============================================================
const router = express.Router()

// Only user.role = admin can crud users
router.use( protect )
router.use( restrictedTo( 'admin' ) )
// All routes below will use the two middlewares above

router
  .route( '/steps' )
  .get( getSteps )

router.use( '/users', userRouter )

// router.route( '/:id' )
//   .delete( deleteUser )
//   .put( updateUser )


module.exports = router