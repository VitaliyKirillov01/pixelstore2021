const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/pixelstore',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
};
const  bodyParser = require('body-parser');
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

const mongodbUrl = 'mongodb://localhost/pixelstore';
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log(error.reason));

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection is opened to ' + mongodbUrl);
});

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  });
}

app.listen(5000, () => { console.log(`Server started at ${config.PORT}`); });
