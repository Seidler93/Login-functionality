const express = require('express');
const routes = require('./routes');
const path = require('path');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

app.use(express.static('public'));

app.get('/home', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/home.html'))
);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
