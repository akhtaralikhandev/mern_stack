import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
const secret = "secretkey";

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await userModel.findOne({ email: email });
    if (oldUser)
      return res.status(400).json({ message: "Account with that email exits" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "1h",
    });
    return res.status(201).json({ newUser: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong" });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).json("Sorry user not found");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(404).json("Password did'nt matched");

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json("Error ocurred");
    console.log(error);
  }
};

export const GoogleUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const token = jwt.sign(
        {
          email: email,
          id: user._id,
        },
        secret,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ result: user, token: token });
    } else if (!user) {
      const newUser = await userModel.create({
        name: name,
        email: email,
      });
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        secret,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ newUser: newUser, token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
