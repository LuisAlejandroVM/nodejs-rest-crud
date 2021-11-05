const express = require('express');
const morgan = require('morgan');

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/products', require('./routes/products'));

//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});