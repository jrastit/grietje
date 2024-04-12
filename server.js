const express = require("express");
const cors = require("cors");
const routes = require("./route");
const config = require("./config.js");
const sequelize = require("./database");
const app = express();
var session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var corsOptions = {
  origin: "https://hans.fexhu.com/",
};

app.use(
  session({
    secret: config.session.secret,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    saveUninitialized: true,
    proxy: true, // if you do SSL outside of node.
  })
);

sequelize.sync({ alter: true });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GeoNFT server." });
});

app.use('/', routes);

// set port, listen for requests
const PORT = process.env.PORT || 5606;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

