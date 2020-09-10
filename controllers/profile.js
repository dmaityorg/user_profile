const Profile = require('../models').Profile;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Profile
      .findAll({
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((profiles) => res.status(200).send(profiles))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Profile
      .findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then((profile) => {
        if (!profile) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return res.status(200).send(profile);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Profile
      .create({
        user_id: req.body.user_id,
        fullname: req.body.fullname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
      })
      .then((profile) => res.status(201).send(profile))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Profile
      .findById(req.params.id, {
        include: [{
          model: User,
          as: 'User'
        }],
      })
      .then(profile => {
        if (!profile) {
          return res.status(404).send({
            message: 'Profile Not Found',
          });
        }
        return profile
          .update({
            user_id: req.body.user_id || classroom.user_id,
            fullname: req.body.fullname || classroom.fullname,
            birthdate: req.body.birthdate || classroom.birthdate,
            gender: req.body.gender || classroom.gender
          })
          .then(() => res.status(200).send(profile))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};