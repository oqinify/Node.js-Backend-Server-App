var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    
    //validate request
    if(!req.body){
        req.status(400).send(
            {
                message: "Content can't be empty!"
            }
        );
        return;
    }

    // new user
    const user = new Userdb(
        {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        }
    )

    // save user into database
    user.save(save)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while saving user!"
            })
        })
}

// retreive and return all users/retreive and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: "User not found"
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retreiving user with id=" + id
                })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retreiving user information!"
                })
            })
    }
}

// update a new identified user by userId
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can't be empty!"
        })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Can't udate user with ${id}. Maybe user not found!`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error udate user information"
            })
        })
}

// delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Can't delete user with id ${id}. Maybe id is wrong`
                })
            } else {
                res.send({
                    message: "User deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete user with id=" + id
            })
        })
}