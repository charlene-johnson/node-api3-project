const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postDb")
const {validateUserId, validateUser, validatePost} = require("../middleware/validate")

const router = express.Router();


// Seems to be adding users but for some reason isn't giving me a green status
router.post('/', validateUser(), (req, res, next) => {
  // do your magic!
  users.insert(req.body)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch(next)
});

// adding user post isn't working either
router.post('/:id/posts',validatePost(),  (req, res, next) => {
  users.insert({...req.body, user_id: req.params.id})
  .then((post) => {
    res.status(201).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts',validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then((count) => {
    if(count > 0) {
      res.status(200).json({message: "This user has been deleted",})
    }
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // do your magic!
  users.update(req.params.id, req.body)
  .then((user) => {
    if (user) {
      res.status(200).json(user)
    }
  })
  .catch(error => {
    next(error)
  })
});


module.exports = router;
