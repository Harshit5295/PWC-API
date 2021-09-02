const express = require('express');
require('./db/mongoose');
const userRouter = require('./router/user');

const app = express();
const port = process.env.PORT || 9000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // if(req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET',)
    //     return res.status(200).json({});
    // }
    next();
})
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});