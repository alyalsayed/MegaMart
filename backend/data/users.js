import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin user",
    email: "admin@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "John Doe ",
    email: "john@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
  {
    name: "Jane walter",
    email: "jane@email.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
];

export default users;
