
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req, res) => {
  
  const { password, student: studentData } = req.body;

  
 
  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });

});

export const UserControllers = {
  createStudent,
};
