const express = "express";

const Users = require("./userDb");

const router = express.Router();

router.use((req, res, next) => {
  console.log("user router!");
  next();
});

router.post("/", validateUser, async (req, res) => {
  res.status(200).json(req.user)
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  res.status(200).json(req.post)
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.find(req.query);
    res.status(200).json(users);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      message: "The users information could not be retreived"
    })
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  res.status(200).json(req.user)
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  res.status(200).json(req.user)
});

router.delete("/:id", validateUserId, async (req, res) => {
  res.status(200).json(req.user)
});

router.put("/:id", validateUserId, async (req, res) => {
  res.status(200).json(req.user)
});

//custom middleware

function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user) {
      req.user = user;
      next();
    }
    else {
      next({ message: "User not found; invalid ID"})
    }
  } catch(error) {
    res.status(500).json({ message: 'failed to process request'})
  }
}

function validateUser(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    next();
  } else {
    next({ message: "Please include request body" });
  }
}

function validatePost(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    next();
  } else {
    next({ message: "Please include request body" });
  }
}

module.exports = router;
