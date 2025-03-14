import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export  const Login=async(req,res)=>{
  
    const user =await User.findOne({email:req.body.email})
    let email=req.body.email
    let password=req.body.password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
  }
    if(user)
    {
            let confirmation=await bcrypt.compare(req.body.password,user.password||"")
            if(confirmation){
                const token = generateTokenAndSetCookie(user._id, res);
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Could not Log In"})
            }
    

    }
    else{
        res.json({success:false,message:'User not found'})
    }
}

export const createUser=async (req, res) => {
    try {
      
      const { name, email, password, gender } = req.body;
      console.log("Extracted Data:", { name, email, password, gender }); 
      if (!name || !email || !password || !gender) {
        return res.status(400).json({ message: "All fields (name, email, password, gender) are required" });
      }
     
      const matchEmail = await User.findOne({ email });
      if (matchEmail) {
        return res.status(400).json({ message: "The email is taken, please use a different email" });
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const girlProfilePic = "https://avatar.iran.liara.run/public/36";
      const boyProfilePic = "https://avatar.iran.liara.run/public/20";
      const otherProfilePic = "https://avatar.iran.liara.run/public/42";
      let profilePic;
      switch (gender) {
        case "male":
          profilePic = boyProfilePic;
          break;
        case "female":
          profilePic = girlProfilePic;
          break;
        case "other":
          profilePic = otherProfilePic;
          break;
        default:
          profilePic = ""; 
      }
  
      
      const newUser =new User( {
        name,
        email,
        password: hashedPassword,
        joinDate: new Date(),
        posts: [],
        gender,
        profilePic,
      });
  
    
      const savedUser=await newUser.save()
      generateTokenAndSetCookie(savedUser,res)
      
      res.status(201).json({
        success: true,
        data: {
          id: newUser._id,
          name,
          email,
          gender,
          profilePic,
        },
      });
     
      console.log(savedUser)
    } catch (error) {
      console.error("Error creating user:", error);
      // res.status(500).json({ message: "Server error creating user", error: error.message });
    }
  }