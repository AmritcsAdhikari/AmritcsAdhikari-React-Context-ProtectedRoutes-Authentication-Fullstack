import express from 'express';
import userController from '../controller/userController.js';
import jwtVerify from '../middleware/jwtVerify.js';
import userReqValidator from '../middleware/user/userReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const userRouter = express.Router();

/**
 * @usage : Register a User
 * @url : http://localhost:7070/users/register/
 * @params : username, email, password
 * @method : POST
 * @access : PRIVATE
 */

userRouter.post(
  '/register',
  userReqValidator,
  expressValidator,
  userController.registerUser
);

/**
 * @usage : Login a User
 * @url : http://localhost:7070/users/login/
 * @params : email, password
 * @method : POST
 * @access : PRIVATE
 */

userRouter.post(
  '/login',
  userReqValidator,
  expressValidator,
  userController.loginUser
);

/**
 * @usage : Get User Details
 * @url : http://localhost:7070/users/me/
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

userRouter.get('/me', jwtVerify, userController.getData);

export default userRouter;
