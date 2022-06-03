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
    username: "RicksPickle",
    userTagName: "@pickledrick",
    password: "tester",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Toxic",
    lastName: "Softie",
    username: "toxic_snek",
    password: "vipersnek",
    userTagName: "@snekBabu",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tryper",
    lastName: "Raptor",
    username: "Raptorbong",
    userTagName: "@razoraptor",
    password: "rapper",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
