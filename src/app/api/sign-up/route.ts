import dbConnect from "@/lib/dbConnects";
import UserModel from "@/model/User.model";
import bcrpyt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerifIcationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        if (existingUserByEmail.isVerified) {
          return Response.json(
            {
              success: false,
              message: "Email already exists",
            },
            { status: 400 }
          );
        } else {
          const hasedPassword = await bcrpyt.hash(password, 10);
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1);

          existingUserByEmail.password = hasedPassword;
          existingUserByEmail.verifyCode = verifyCode;
          existingUserByEmail.verifyCodeExpiry = expiryDate;
          await existingUserByEmail.save();
        }
      }
    } else {
      const hasedPassword = await bcrpyt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send verification email
    const emailresponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailresponse.success) {
      return Response.json(
        {
          success: false,
          message: emailresponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User created successfully, please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in sign-up route", error);
    return Response.json(
      {
        success: false,
        message: "Error in sign-up route",
      },
      { status: 500 }
    );
  }
}
