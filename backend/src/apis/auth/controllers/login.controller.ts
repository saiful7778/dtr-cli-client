import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../../schemas/auth.schema";
import createHttpError from "http-errors";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/user.modal";
import { sign } from "jsonwebtoken";
import getEnv from "../../../utils/env";
import { compare } from "bcrypt";

export default function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isValid = loginSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(
      createHttpError(
        422,
        isValid.error.errors.map((ele) => ele.message).join(", ")
      )
    );
  }
  const { email, password } = isValid.data;

  serverHelper(async () => {
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return next(createHttpError(404, "User doesn't exist"));
    }

    if (!userExist.access) {
      return next(createHttpError(422, "User can't access this site"));
    }

    const isPasswordValid = await compare(password, userExist.hashedPassword);

    if (!isPasswordValid) {
      return next(createHttpError(422, "Password is not valid"));
    }

    const token = sign(
      {
        _id: userExist._id,
        email: userExist.email,
        role: userExist.role,
      },
      getEnv("accessToken"),
      {
        expiresIn: "5h",
      }
    );

    res.status(200).json({
      success: true,
      data: {
        _id: userExist._id,
        role: userExist.role,
        token,
      },
    });
  }, next);
}
