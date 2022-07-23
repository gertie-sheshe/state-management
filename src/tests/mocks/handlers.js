import { rest } from "msw";
const API_URL = "http://localhost:3000";

const fetchUsers = rest.get(`${API_URL}/users`, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
      },
    ])
  );
});

export const fetchUsersError = rest.get(`${API_URL}/users`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({
      error: "Internal server error",
    })
  );
});

const fetchUsersTodos = rest.get(
  `${API_URL}/users/:id/todos`,
  (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: false,
        },
        {
          userId: 1,
          id: 5,
          title:
            "laboriosam mollitia et enim quasi adipisci quia provident illum",
          completed: false,
        },
        {
          userId: 1,
          id: 9,
          title: "molestiae perspiciatis ipsa",
          completed: false,
        },
        {
          userId: 1,
          id: 13,
          title: "et doloremque nulla",
          completed: false,
        },
        {
          title: "home alone",
          completed: false,
          userId: "1",
          id: 14,
        },
      ])
    );
  }
);

export const handlers = [fetchUsers, fetchUsersTodos];
