import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'Name cannot be more than 20 characters long'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} : The gender field can only be one of the followings:'male', 'female', 'other' ",
      },
      required: true,
    },
    dateOfBirth: { type: String },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    profileImage: { type: String },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual : generating full name

facultySchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

// filter out deleted documents
facultySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  facultySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  facultySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  
  //checking if user is already exist!
  facultySchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Faculty.findOne({ id });
    return existingUser;
  };

// creating model

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
