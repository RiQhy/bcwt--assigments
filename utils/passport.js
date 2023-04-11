"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: "Foo Bar",
    email: "foo@bar.fi",
    password: "foobar",
  },
  {
    user_id: 2,
    name: "Bar Foo",
    email: "bar@foo.fi",
    password: "barfoo",
  },
];
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  process.nextTick(() => {
    return done(null, {
      id
    });
  });
  console.log("serialize", id);
  // serialize user id by adding it to 'done()' callback
  
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async(id, done) => {
  const user = getUser(id);
  console.log(user);
  process.nextTick(() => {
    return done(null,id);
  });
  // get user data by id from getUser
  console.log("deserialize", user);
  // deserialize user by adding it to 'done()' callback
  
});

passport.use(
  new Strategy((username, password, done) => {
    // get user by username from getUserLogin
    try {
      const user = getUserLogin(username);
    if(user === undefined){
    // if user is undefined
      return done(null, false);
    }
    if(user.password !== password){
    // if passwords dont match
    return done(null, false);
    }
    // if all is ok
    console.log(user);
    return done(null, user.user_id);
    } catch(err){
      return done(err);
    }
  })
);

module.exports = passport;