import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Pickle",
    lastName: "Rick",
    username: "pickledrick",
    email: "picklerick@gmail.com",
    password: "tester",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Toxic",
    lastName: "Softie",
    username: "snekbabu",
    email: "snekbabu@gmail.com",
    password: "vipersnek",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tryper",
    lastName: "Raptor",
    username: "Raptorbong",
    email: "raptortryper@gmail.com",
    password: "rapper",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "T-Rex",
    lastName: "Tutu",
    username: "trex_in_a_tutu",
    email: "trextutu@gmail.com",
    password: "dinoboss",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
