const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.use((req, res, next) => {
  console.log("post router!");
  next();
});

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retreived"
    });
  }
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Posts.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).json({
        message: "The post has been deleted"
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post could not be removed."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { user_id, text } = post;
    const post = await Posts.update(req.params.id, req.body);
    if (!text) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post"
      });
    } else {
      db.update(id, post).then(updatedPost => {
        if (updatedPost) {
          res.status(200).json(updatedPost);
        } else {
          res.status(404).json({
            error: "The post with the specified ID does not exist."
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retreived."
    });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      next({ message: "Post not found, invalid ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to process request" });
  }
}

module.exports = router;
