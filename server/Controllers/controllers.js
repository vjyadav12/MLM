import data from "../Schema/schema.js";
import bcrypt from 'bcrypt'

const about = () => {
  console.log("controller about page");
};

// Register function R-> Register + token 
const R = async(req,res,next)=>{

    const { name, age, email, password } = req.body;

  const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7dayslogin 
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production' // Set to true in production, false in development
}

  try {
    if (!name || !email || !password || !age) {

      return res.status(400).json({
        success: false,
        message: "Every field is require ",
      });
    }
    const userExist = await data.findOne({ email });
   
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already Exists",
      });
    }

    const user = await data.create({
      name,
      email,
      password,
    });

    await user.save();

    const token = await user.generateJWTToken()

    res.cookie('token', token,cookieOption)


    

    user.password = undefined;


    res.status(200).json({
      success: true,
      isLoggedIn:true,
      message: "user Registration Successfully",
      user,
      token
    });

  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// LOgin Section/ FUcntion (L)- >Login

const L = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password for login",
            });
        }

        // Find the user by email and include the password in the result
        const user = await data.findOne({ email }).select('+password');

        // Check if the user exists and if the password matches
        if (!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(400).json({
                success: false,
                message: "Email or password is incorrect",
            });
        }

        // If the login is successful, return a success message
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
        });
    } catch (e) {
        // Handle any unexpected errors
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};


const UserReference = async (req, res, next) => {
  try {
    const { name, age, email, password } = req.body;
    const { id: ReferalID } = req.params; // Adjust to access the ID from params

    if (!ReferalID) {
      return res.status(400).json({
        success: false,
        message: "Please provide the referral ID of the user",
      });
    }

    if (!name || !email || !password || !age) {

      return res.status(400).json({
        success: false,
        message: "Every field is require ",
      });
    }
    const userExist = await data.findOne({ email });
   
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already Exists",
      });
    }

    // Check if the referral ID exists in the database
    const oldUser = await data.findById(ReferalID);
    if (!oldUser) {
      return res.status(400).json({
        success: false,
        message: "User with provided referral ID does not exist",
      });
    }

    // Hash the new user's password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided details
    const newUser = new data({
      name,
      age,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Now, add the new user's ID to the referredUsers array of the old user
    oldUser.referredUsers.push(newUser._id);
    await oldUser.save();

    return res.status(200).json({
      success: true,
      message: "New user successfully added and linked to the referral",
      oldUser,
      newUser,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      success: false,
      message: "Invalid user reference or something went wrong",
    });
  }
};

const UserDetails = async (req, res, next) => {
  try {
    const { id: oldUserId } = req.params; // Access the `oldUserId` from the URL parameters

    if (!oldUserId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the user ID",
      });
    }

    // Fetch the user by ID
    const user = await data.findById(oldUserId).populate('referredUsers'); // Populate the referredUsers field to get their details

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user found, return their details
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user details",
    });
  }
};



export default UserReference;


export {
    about,
    R,
    L,
    UserReference,
    UserDetails
 };
