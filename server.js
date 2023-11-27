// Server Configuration:
const path = require('path');

const express = require ('express');

const router = require ('./Develop/controllers');

const sequelize = require ('./Develop/config/connection');

const exphbs = require('express-handlebars');

const helpers = require('./Develop/utils/helpers');

const hbs = exphbs.create({ helpers });

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3306;

// ---------------------------------------------------------------------------
// Session Configuration:
const userSession = {

    secret: process.env.DB_SECRET,

    cookie: {},

    resave: false,

    saveUninitialized: true,

    store: new SequelizeStore({

        db: sequelize

    })

};

// ---------------------------------------------------------------------------
// Handlebars Engine Setup:

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// ---------------------------------------------------------------------------
// Body-parsing Middleware:

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Session Middleware:

app.use(session(userSession));

// ---------------------------------------------------------------------------
// Routes Setup:

app.use(router);

// ---------------------------------------------------------------------------
// Starting Server & Syncing With Database:

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Application now listening on ${PORT}!`));
    });
