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
      likeCount: 6,
      likedBy: [],
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
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Raptorbong",
        text: "Wow!",
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
      likeCount: 10,
      likedBy: [],
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
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "pickledrick",
        text: "Wow!",
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
      likeCount: 5,
      likedBy: [],
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
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "snekbabu",
        text: "Wow!",
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
      likeCount: 5,
      likedBy: [],
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
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Raptorbong",
        text: "Wow!",
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
      likeCount: 11,
      likedBy: [{ username: 'dawdwda' }, { username: 'grgdggr' }],
    },
    firstName: "T-Rex",
    lastName: "Tutu",
    username: "trex_in_a_tutu",
    comments: [
      {
        _id: uuid(),
        username: "Raptorbong",
        text: "Interesting",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "pickledrick",
        text: "Wow!",
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
