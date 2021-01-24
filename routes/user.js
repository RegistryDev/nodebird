const express = require('express');

const {isLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('Follow Success');
    } else {
      res.status(404).send('no user');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send('Unfollow Success')
    } else {
      res.status(404).send('no user');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (user) {
      await user.addLike(parseInt(req.params.id, 10));
      res.send('Like Success');
    } else {
      res.status(404).send('no user');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/unlike', isLoggedIn, async (req, res, next) =>{
  try {
    const user = await User.findOne({where: {id: req.user.id}});
    if (user) {
      await user.removeLike(parseInt(req.params.id, 10));
      res.send('Unlike Success')
    }else {
      res.status(404).send('no user');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;