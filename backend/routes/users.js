const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });//check user exist??
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();//encryt
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({//creat new user
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("enter login");
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)//if field email and pass null
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)//check user existing in data
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });//check wrong pass

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn: "180s"});//create token with expire time in 3m
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//check token valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    //const token = req.header("x-auth-token");
    console.log("token is valid: " + req.body.token);
    if (!req.body.token) return res.json(false);
    const verified = jwt.verify(req.body.token, process.env.JWT_SECRET, function(err, decode){//verify token
      if(err){
          res.json(false);
      }
      else
      { 
          res.json(true);
      }
     
  });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//get ID and displayname user loging
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});
//API facebook and google login
router.post("/facebooklogin", async (req,res) =>{
  try {
    const { name, token } = req.body;
    // validate 
    const tokenface = jwt.sign({ id: req.body.name }, process.env.JWT_SECRET, {expiresIn: "180s"});//create token with expire time is 3m
    res.json({
      tokenface,
      displayName: req.body.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;