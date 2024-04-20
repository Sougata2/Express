import bcrypt from "bcrypt";

const saltRounds = 10;
async function hasPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

export { hasPassword, comparePassword };
