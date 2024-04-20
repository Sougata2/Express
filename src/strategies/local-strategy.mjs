import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserializer`);
  console.log(`Deserializing User ID: ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.id == id);
    if (!findUser) throw new Error("User not Found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

// username field will refer to username field in post body,
// if field needs to be changed to email or somethings else
// then field must be changed in both post body and
/*
export default passport.use(
    new Strategy("email", (username, password, done) => {
*/
export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username : ${username}`);
    console.log(`Password : ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credetials!");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
