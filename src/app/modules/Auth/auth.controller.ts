import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

// change password

const changePassword = catchAsync(async (req, res) => {
  // console.log(req.user, req.body);

  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password changed  successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});



export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken
};
