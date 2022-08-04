const { User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt"); 
const { generateToken, verifyToken } = require("../lib/jwt")
const mailer = require("../lib/mailer") 

async function SendVerification(id, email, username) {

  const token = await generateToken({id, isEmailVerification : true}, "180s"); 
  const url_verify = process.env.LINK_VERIFY + token


      await mailer({
        to: email, 
        subject: "Halo" +username+ "please kindly verify your account", 
        html: `<div> <h1> Your Account has been registered</h1> </div> 
        <div> Please verify your account throught this <a href="${url_verify}">Link</a></div>`,
      }) 
      return token
}

const userController = {
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body)

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }],
        },
      });

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = bcrypt.compareSync(password, user.password);

      if (!checkPass) {
        throw new Error("username/email/password not found");
      }



      const token = generateToken({
         id: user.id, password: user.password
      })

      // console.log(user.dataValues)
      // console.log("123")


      // delete user.dataValues.password; 
      // delete user.dataValues.createdAt; 
      // delete user.datavalues.updatedAt;


      res.status(200).json({
        message: "login succeed",
        result: {user, token},
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  keepLogin: async(req, res) => {
    // Terima token 
    // Check kalau token Valid 
    // Renew token 
    // Kirim token + user data 
    try {
      const { token } = req; 
      console.log(token) 

      const renewedToken = generateToken({ id: token.id, password: token.password }); 

      const findUser = await User.findByPk(token.id); 

      delete findUser.dataValues.password; 

      return res.status(200).json({
        message: "renewed user token", 
        result: {
          user: findUser, 
          token: renewedToken,
        },
      });
    }catch (err) {
      console.log(err); 
      return res.status(500).json({
        message: "server error"
      });
    }

  },

  register: async (req, res) => {
    try {
      const { username, password, full_name, email } = req.body;
      console.log(req.body)

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      // if (findUser) {
      //   throw Error("username/email has been taken");
      // }

      const hashedPassword = bcrypt.hashSync(password, 5);

     const user =  await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });

      const token = await generateToken({id: user.id, isEmailVerification : true}); 

      const verToken = await SendVerification(user.id, email, username)

    //  console.log(token)

      return res.status(200).json({
        message: "new user has been created",
        result: {
          user, token, verToken
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  }, 

 
  editUser: async(req, res) => {
    try {
      const { id } = req.params;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN; 
      const filePath = "profile_pict"; 
      const { filename } = req.file; 

      await User.update(
        {
          image_url: `${uploadFileDomain}/${filePath}/${filename}`, 
          ...req.body,
        }, 
        {
          where: {
            id,
          },
        }
      ); 
      return res.status(200).json({
        message: "user profile edited",
      })
    } catch (err) {
      console.log(err); 
      res.status(500).json({
        message: "Error" 
      })
    }
  },
  verifyUser: async (req, res) => {
    try {
      const {verToken} = req.params 

      console.log(req.params)
      const isTokenVerified = verifyToken(verToken, process.env.JWT_SECRET_KEY) 

      if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
        throw new Error("token is invalid")
      }

      await User.update({ is_verified: true}, {where:{
        id: isTokenVerified.id 
      }})

      return res.status(200).json({
        message: "User is Verified", 
        success: true
      })
    }
    catch (err) {
      console.log(err); 
      res.status(400).json({
        message: err.toString(), 
        success: false
      }) 
    }
  }
};

module.exports = userController;

