import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Tournament for who's the biggest whale in Genshin starts tomorrow 12:00 GMT+. Time to go brokkk. ",
    likes: {
      likeCount: 2,
      likedBy: [
        { username: "snekbabu" },
        { username: "Raptorbong" },
      ],
      dislikedBy: [],
    },
    username: "pickledrick",
    firstName: "Pickle",
    lastName: "Rick",
    createdAt: new Date("May 28 2022 9:22:52"),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "snekbabu",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Raptorbong",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Tournament for who's the biggest whale in Genshin starts tomorrow 12:00 GMT+. Time to go brokkk. ",
    likes: {
      likeCount: 4,
      likedBy: [
        { username: "snekbabu" },
        { username: "Raptorbong" },
        { username: "zhonglee" },
        { username: "trex_in_a_tutu" }
      ],
      dislikedBy: [],
    },
    firstName: "Toxic",
    lastName: "Softie",
    username: "snekbabu",
    createdAt: new Date("May 16 2022 9:22:52"),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "Raptorbong",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "pickledrick",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Tournament for who's the biggest whale in Genshin starts tomorrow 12:00 GMT+. Time to go brokkk. ",
    likes: {
      likeCount: 3,
      likedBy: [
        { username: "snekbabu" },
        { username: "Raptorbong" },
        { username: "trex_in_a_tutu" }
      ],
      dislikedBy: [],
    },
    firstName: "Tryper",
    lastName: "Raptor",
    username: "Raptorbong",
    createdAt: new Date("Apr 28 2021 9:22:52"),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "pickledrick",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "snekbabu",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Tournament for who's the biggest whale in Genshin starts tomorrow 12:00 GMT+. Time to go brokkk. ",
    likes: {
      likeCount: 4,
      likedBy: [
        { username: "snekbabu" },
        { username: "Raptorbong" },
        { username: "zhonglee" },
        { username: "trex_in_a_tutu" }
      ],
      dislikedBy: [],
    },
    firstName: "T-Rex",
    lastName: "Tutu",
    username: "trex_in_a_tutu",
    createdAt: new Date("Jan 10 2022 9:22:52"),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "pickledrick",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Raptorbong",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: uuid(),
    content:
      "Say no to cat memes and anything cat. just nope <3.",
    likes: {
      likeCount: 3,
      likedBy: [
        { username: "Raptorbong" },
        { username: "zhonglee" },
        { username: "trex_in_a_tutu" }],
    },
    firstName: "T-Rex",
    lastName: "Tutu",
    username: "trex_in_a_tutu",
    comments: [
      {
        _id: uuid(),
        username: "Raptorbong",
        commentData: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "pickledrick",
        commentData: "Wow!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: new Date("March 02 2021 14:23:43"),
    updatedAt: formatDate(),
  },
];
