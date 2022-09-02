import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.post(`${apiUrl}users/login`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzBkMDBjMTE1MDllNTE2N2JiN2Y1YmIiLCJpYXQiOjE2NjIwOTY0NzB9.tVQVAvCBc5CXN7-GQirdI67Q8Zuzae0EQmVBhPow11s",
      })
    );
  }),

  rest.post(`${apiUrl}users/register`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        username: "test0",
        id: "6311947608ed28e35ccabbeb",
      })
    );
  }),
];

export default handlers;
