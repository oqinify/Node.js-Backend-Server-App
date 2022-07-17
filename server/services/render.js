const axios = require('axios');


exports.homeRoutes = (req, res)=>{
    axios.get('https://nodejs-backend-server-app.herokuapp.com:80/api/users')
        .then(function(responses){
            res.render('index', {users : responses.data});
        })
        .catch(err => {
            res.send(err)
        })
}

exports.add_user = (req, res)=>{
    res.render('add_user')
}

exports.update_user = (req, res)=>{
    res.render('update_user')
}