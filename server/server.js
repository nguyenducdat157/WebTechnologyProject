const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

require('dotenv').config({
    path:'./config/index.env'
})

//MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(morgan('dev'))
app.use(cors())

//routes
app.use("/public/uploads/", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));
app.use('/api/users', require('./routes/user'));


app.get('/', (req, res) => {
    res.send('test route => home page');
});

//Page Not founded
app.use((req, res) => {
    res.status(404).json({
        msg: 'Page not founded'
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})