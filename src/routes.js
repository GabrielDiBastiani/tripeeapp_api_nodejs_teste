const {Router} = require('express');
const UserController = require('./controller/UserController')

const routes = Router();

// Query Params: req.query()
// Route Params: req.params()
// Query Params: req.body()

// routes.get('/', (req,res) => {
//     return res.json({message: "fuck you!"});
// })

routes.get('/', UserController.index);
routes.post('/', UserController.show);

module.exports = routes;