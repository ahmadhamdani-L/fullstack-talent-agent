import AuthHelper from "../helpers/AuthHelper";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import formidable from "formidable";
import fs from "fs";

// findAll = select * from users
const findAll = async (req, res) => {
  const users = await req.context.models.Users.findAll({
    include: [
      {
        all: true,
      },
    ],
  });
  return res.send(users);
};

// create user with hash & salt
/* const signup = async (req, res,next) => {
  //const { user_name, user_email, user_password } = req.body;

  const { dataValues } = new req.context.models.Users(req.body);

  const salt = AuthHelper.makeSalt();
  const hashPassword = AuthHelper.hashPassword(dataValues.user_password, salt);

  const users = await req.context.models.Users.create({
    user_name: dataValues.user_name,
    user_email: dataValues.user_email,
    user_password: hashPassword,
    user_salt: salt,
    user_birthdate: dataValues.user_birthdate,
    user_gender: dataValues.user_gender,
	
    user_type: dataValues.user_type,
  });

  return res.send(users)
}
 */

const pathDir = __dirname + "../../uploads/";
const createAvatar = (req, res, next) => {
  const { dataValues } = new req.context.models.Users(req.body);

  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: pathDir,
    keepExtensions: true,
  });

  form
    .on("fileBegin", function (name, file) {
      //rename the incoming file to the file's name
      file.path = pathDir + file.name;
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let user = new req.context.models.Users(fields);
      const { dataValues } = user;

      const salt = AuthHelper.makeSalt();
      const hashPassword = AuthHelper.hashPassword(
        dataValues.user_password,
        salt
      );

      user.user_salt = salt;
      user.user_password = hashPassword;

      if (files) {
        user.user_avatar = files.user_avatar.name;

        console.log(user);
      }

      try {
        const result = await req.context.models.Users.create(user.dataValues);

        return res.send(result);
      } catch (error) {
        res.send(error.message);
      }
    });
};

const update = async (req, res) => {
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: pathDir,
    keepExtensions: true,
  });

  form
    .on("fileBegin", function (name, file) {
      //rename the incoming file to the file's name
      file.path = pathDir + file.name;
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let user = new req.context.models.Users(fields);
      const { dataValues } = user;

      const salt = AuthHelper.makeSalt();
      const hashPassword = AuthHelper.hashPassword(
        dataValues.user_password,
        salt
      );

      user.user_salt = salt;
      user.user_password = hashPassword;

      if (files) {
        user.user_avatar = files.user_avatar.name;
        console.log(user);
      }

      try {
        const result = await req.context.models.Users.update(user.dataValues, {
          returning: true,
          where: { user_id: parseInt(req.params.id) },
        });
        return res.send(result);
      } catch (error) {
        res.send(error.message);
      }
    });
};

// filter find by user_email
const signin = async (req, res) => {
  //1. extract values from request body
  const { user_email, user_password } = req.body;

  //2. gunakan try catch, agar jika terjadi error misal table ga bisa diakses bisa munculkan error message
  try {
    // idem : select * from users where user_email = :user_email
    const users = await req.context.models.Users.findOne({
      where: { user_email: user_email },
    });

    //3. jika user tidak ketemu munculkan error
    if (!users) {
      return res.status("400").json({
        error: "User not found",
      });
    }

    //3. check apakah user_password di table === user_passowrd yg di entry dari body,
    // tambahkan salt
    if (
      !AuthHelper.authenticate(
        user_password,
        users.dataValues.user_password,
        users.dataValues.user_salt
      )
    ) {
      return res.status("401").send({
        error: "Email and password doesn't match.",
      });
    }

    //4. generate token jwt, jangan lupa tambahkan jwtSecret value di file config.js
    const token = jwt.sign({ _id: users.user_id }, config.jwtSecret);

    //5. set expire cookie
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });

    //6. exclude value user_password & user_salt, agar tidak tampil di front-end
    // lalu send dengan include token, it's done
    return res.json({
      token,
      users: {
        user_id: users.dataValues.user_id,
        user_name: users.dataValues.user_name,
        user_email: users.dataValues.user_email,
        user_type: users.dataValues.user_type,
      },
    });
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

const remove = async (req, res) => {
  await req.context.models.Users.destroy({
    where: { user_id: req.params.id },
  }).then((result) => {
    return res.send("delete " + result + " rows.");
  });
};

const check = async (req, res, next) => {
  const { user } = req.body;
  const { talents_carts } = req.body;
  try {
    const users = await req.context.models.Users.create(user);

    req.emps = {
      user_id: users.user_id,
      talents_cart: talents_carts,
    };
    next();
  } catch (error) {
    let x = error;
    res.send(error.message);
  }
};

const findOne = async (req, res) => {
  const users = await req.context.models.Users.findOne({
    include: [
      {
        model: req.context.models.Talents_cart,
      },
    ],
    where: { user_id: req.params.id },
  });
  return res.send(users);
};

const checkL = async (req, res, next) => {
  try {
    const data = await req.context.models.Users.findOne({
      where: { user_id: req.params.id },
    });
    req.user = data;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
  findAll,
  /* signup, */
  signin,
  update,
  requireSignin,
  signout,
  createAvatar,
  remove,
  check,
  findOne,
  checkL,
};
