
// const { getTodos, addTodo, deleteTodo, updateTodo } = require( '../controllers/todos.controlr' )
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require( '../controllers/user.cont' )
const express = require( 'express' )
const router = express.Router()


router
  .route( '/' )
  .get( getUsers )
  .post( createUser )

router.route( '/:id' )
  .get( getUser )
  .delete( deleteUser )
  .patch( updateUser )

module.exports = router