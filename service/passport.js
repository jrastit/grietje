const sequelize = require('../database');
const { DataTypes } = require("sequelize")
const USER = require('../model/user')
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const user = await USER.findOne({ where: { login: username } })
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' })
            }
            const passVal = user.validPassword(password)
            if (!passVal) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    }
))

passport.use('local.signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, username, password, done) {
        console.log('register');
        try {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            USER.findOne({ where: { 'login': username } }).then((user) => {


                // check to see if theres already a user with that email
                if (user) {
                    console.log('register user exist');
                    return done('That login is already taken.');
                } else {
                    console.log('register continue');
                    // if there is no user with that email
                    // create the user
                    var newUser = new USER();

                    // set the user's local credentials
                    newUser.login = username;
                    newUser.setPassword(password);

                    // save the user
                    newUser.save().then((newUser) => {
                        return done(null, newUser);
                    }
                    ).catch((err) => {
                        if (err)
                            throw err;
                        console.log('register ok');

                        return done(null, newUser);
                    });

                }

            }).catch((err) => {
                console.log('register error');
                console.error(err);
                return done(err);
            });
        } catch (err) {
            console.log('register error');
            return done(err)
        }
    }));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    USER.findByPk(id).then(function (user) { done(null, user); });
});