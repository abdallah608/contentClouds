import { Op } from "sequelize";
import User from "../../../models/user.js";
import ApiFeature from "../../../utilities/ApiFeature/ApiFeature.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import appError from "../../../utilities/error/appError.js";

// create user
export const createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, age, phone } = req.body;

  const searchQuery = [
    {
      email: email,
      phone: phone,
    },
  ];

  const isExisting = await User.findOne({
    where: {
      [Op.or]: searchQuery,
    },
  });

  if (isExisting) {
    return next(
      new appError("user member with this email  already exists.", 400)
    );
  }

  try {
    const newRecord = await User.create({
      name,
      email,
      age,
      phone,
    });

    res
      .status(201)
      .json({ message: "user created successfully.", data: newRecord });
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});
// Get users
export const getAllUser = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(User, req.query)
    .pagination()
    .filter()
    .search();

  apiFeatures.queryOptions.order = [["createdAt", "DESC"]];
  await apiFeatures.getTotalDocs();
  let found = await User.findAll(apiFeatures.queryOptions);

  res.status(200).json({
    message: "done",
    page: apiFeatures.page,
    totalDocs: apiFeatures.totalDocs,
    totalPages: apiFeatures.totalPages,
    data: found,
  });
});
// Get user by ID
export const getUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const record = await User.findByPk(id);

  if (!record) {
    return next(new appError("user not found.", 400));
  }

  res.status(200).json({ data: record });
});

// Update user
export const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age, phone } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    return next(new appError("User not found.", 404));
  }

  if (email || phone) {
    const searchQuery = [];

    if (email) {
      searchQuery.push({ email });
    }
    if (phone) {
      searchQuery.push({ phone });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.and]: [{ [Op.or]: searchQuery }, { id: { [Op.ne]: id } }],
      },
    });

    if (existingUser) {
      return next(new appError("Email or phone number already exists.", 400));
    }
  }

  // Update user
  const updatedUser = await user.update({
    name: name || user.name,
    email: email || user.email,
    age: age || user.age,
    phone: phone || user.phone,
  });

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return next(new appError("User not found.", 404));
  }

  await user.destroy();

  res.status(200).json({
    message: "User deleted successfully",
  });
});
