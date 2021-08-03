const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./Models/Users");
const Blogs = require("./Models/Blogs");
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  User.findOne({ name: name }, (err, user) => {
    if (user != null) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          const error = "Something went wrong  !!";
          res.status(200).json({ error });
        } else if (result == true) {
          console.log(user);
          res.status(200).json({ id: user._id, img: user.img });
        } else {
          const error = "Wrong Password !!";
          res.status(200).json({ error });
        }
      });
    } else if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else {
      const error = "Please Sign Up First!!";
      res.status(200).json({ error });
    }
  });
});
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  User.findOne({ name: name }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result == true) {
          const error = "Already Registered,  Login please !!";
          res.status(200).json({ error });
        } else {
          const error = "Use another username !!";
          res.status(200).json({ error });
        }
      });
    } else if (err) {
      const error = "Something went wrong  !!";
      console.log(err);
      res.status(200).json({ error });
    } else {
      const newuser = new User({
        name: name,
        email: email,
        password: password,
      });
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) {
          console.log(password);
          console.log(err);
          const error = "Something went wrong  !!";
          res.status(200).json({ error });
        } else {
          newuser.password = hashed;
          newuser.save((err, data) => {
            if (err) {
              const error = "Something went wrong  !!";
              res.status(200).json({ error });
            } else if (data) res.status(200).json({ success: true });
          });
        }
      });
    }
  });
});
router.post("/addblog/:id", (req, res) => {
  let id = req.params.id;
  const { title, desc } = req.body;
  let newblog = new Blogs({ title, desc, owner: id });
  newblog.save((err, result) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (result) {
      console.log(result);
      User.findByIdAndUpdate(
        id,
        { $push: { blogs: result._id } },
        (err, data) => {
          if (err) {
            const error = "Something went wrong  !!";
            res.status(200).json({ error });
          } else if (data) {
            console.log(data);
            result.ownerName = data.name;
            result.save((err, result) => {
              if (err) {
                const error = "Something went wrong  !!";
                res.status(200).json({ error });
              } else res.status(200).json({ success: true });
            });
          }
        }
      );
    }
  });
});
router.get("/deleteblog/:id", (req, res) => {
  let id = req.params.id;
  Blogs.findById(id, (err, blog) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (blog === null) {
      const error = "No blog exist with this id";
      res.status(200).json({ error });
    } else {
      Blogs.deleteOne({ _id: id }, (err, data) => {
        if (err) {
          const error = "Something went wrong  !!";
          res.status(200).json({ error });
        } else if (data) {
          console.log(data);
          User.findOneAndUpdate(
            { blogs: id },
            { $pull: { blogs: id } },
            (err, data) => {
              if (err) {
                const error = "Something went wrong  !!";
                res.status(200).json({ error });
              } else if (data) res.status(200).json({ success: true });
            }
          );
        }
      });
    }
  });
});
router.post("/updateblog/:id", (req, res) => {
  const { title, desc } = req.body;
  let id = req.params.id;
  Blogs.findById(id, (err, blog) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (blog === null) {
      const error = "No blog exist with this id";
      res.status(200).json({ error });
    } else {
      Blogs.findByIdAndUpdate(
        id,
        { $set: { title: title, desc: desc, updated_at: Date.now() } },
        (err, data) => {
          if (err) {
            const error = "Something went wrong  !!";
            res.status(200).json({ error });
          } else if (data) {
            console.log(data);
            res.status(200).json({ success: true });
          }
        }
      );
    }
  });
});
router.get("/blogs", (req, res) => {
  Blogs.find({}, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ data });
    }
  });
});
router.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ data });
    }
  });
});

router.get("/blog/:id", (req, res) => {
  let id = req.params.id;
  Blogs.findById(id, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ data });
    }
  });
});
router.get("/user/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ data });
    }
  });
});
router.get("/deleteaccount/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete(id, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      Blogs.deleteMany({ owner: id }, (err, data) => {
        if (err) {
          const error = "Something went wrong  !!";
          res.status(200).json({ error });
        } else if (data) {
          res.status(200).json({ success: true });
        }
      });
    }
  });
});
router.get("/userblogs/:id", (req, res) => {
  let id = req.params.id;
  Blogs.find({ owner: id }, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ data });
    }
  });
});
router.post("/updatePic/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndUpdate(id, { $set: { img: req.body.img } }, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ success: true });
    }
  });
});
router.get("/deletePic/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndUpdate(id, { $set: { img: null } }, (err, data) => {
    if (err) {
      const error = "Something went wrong  !!";
      res.status(200).json({ error });
    } else if (data) {
      res.status(200).json({ success: true });
    }
  });
});
module.exports = router;
