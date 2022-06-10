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
    bio: "Pickled Rick must taste reallly good, that episode is litt",
    bioLink: "https://rickandmorty.fandom.com/wiki/Rickipedia",
    avatarURL: "",
    followers: [
      { username: "Raptorbong" },
    ],
    following: [
      { username: "snekbabu" },
      { username: "Raptorbong" },
    ],
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
    bio: "Pickled Rick must taste reallly good, that episode is litt",
    bioLink: "https://rickandmorty.fandom.com/wiki/Rickipedia",
    avatarURL: "https://res.cloudinary.com/ds9sho1ch/image/upload/v1654622202/w1yksczmnz6w3h0jc1hh.jpg",
    followers: [{ username: "pickledrick" }, { username: "Raptorbong", }],
    following: [
      { username: "Raptorbong" },
    ],
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
    bio: "Pickled Rick must taste reallly good, that episode is litt",
    bioLink: "https://rickandmorty.fandom.com/wiki/Rickipedia",
    avatarURL: "https://res.cloudinary.com/ds9sho1ch/image/upload/v1619787212/rnpbhcwkg5ihnwfzakhz.jpg",
    followers: [{ username: "pickledrick" }, { username: "snekbabu", }],
    following: [
      { username: "pickledrick" },
      { username: "snekbabu" },
    ],
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
    bio: "Pickled Rick must taste reallly good, that episode is litt",
    bioLink: "https://rickandmorty.fandom.com/wiki/Rickipedia",
    avatarURL: "https://res.cloudinary.com/ds9sho1ch/image/upload/v1654622202/w1yksczmnz6w3h0jc1hh.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "RexLapis",
    lastName: "Glizhong",
    username: "zhonglee",
    email: "trextutu@gmail.com",
    password: "dinoboss",
    bio: "Pickled Rick must taste reallly good, that episode is litt",
    bioLink: "https://rickandmorty.fandom.com/wiki/Rickipedia",
    avatarURL: "https://res.cloudinary.com/ds9sho1ch/image/upload/v1619784454/sample.jpg",
    followers: [],
    following: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
