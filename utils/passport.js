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
      id: users.user_id,
      username: users.name,
      email: users.email
    }, 
    {message: 'User serialized'});
  });
  console.log("serialize", id);
  // serialize user id by adding it to 'done()' callback
  
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
  id = getUser(id);
  process.nextTick(() => {
    return done(null,id,{message: 'User deserialized'});
  });
  // get user data by id from getUser
  console.log("deserialize", user);
  // deserialize user by adding it to 'done()' callback
  
});

passport.use(
  new Strategy((username, password, done) => {
    // get user by username from getUserLogin
    try {
      const [user] = await getUserLogin(email);
    if(user === undefined){
    // if user is undefined
      return done(null, false);
    }
    if(user.password !== password){
    // if passwords dont match
    return done(null, false);
    }
    // if all is ok
    return done(null, user.user_id);
    } catch(err){
      return done(err);
    }
  })
);

module.exports = passport;