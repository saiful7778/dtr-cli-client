import type { Request, Response, NextFunction } from "express";
import { registrationSchema } from "../../../schemas/auth.schema";
import createHttpError from "http-errors";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/user.modal";
import { genSalt, hash } from "bcrypt";

export default function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isValid = registrationSchema.safeParse(req.body);
  if (!isValid.success) {
    return next(
      createHttpError(
        422,
        isValid.error.errors.map((ele) => ele.message).join(", ")
      )
    );
  }
  const { email, fullName, password } = isValid.data;

  serverHelper(async () => {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return next(createHttpError(400, "User is already exist"));
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await userModel.create({
      fullName,
      email,
      hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...userData } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User is successfully created",
      data: userData,
    });
  }, next);
}
