const express = require( 'express' )
const {
  register,
  login,
  logout,
  getMe,
  // updateDetails, 
  // updatePassword
} = require( '../controllers/auth.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )

//=================================================================
const router = express.Router()

router.post( '/register', register )
router.post( '/login', login )
router.get( '/me', protect, getMe )
router.get( '/logout', protect, logout )
// router.put( '/update-details', protect, updateDetails )
// router.put( '/update-password', protect, updatePassword )
// router.post('/forgot-password', forgotPassword)
// router.put('/reset-password/:resettoken', resetPassword)

module.exports = router