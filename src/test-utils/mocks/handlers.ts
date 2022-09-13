import { rest } from "msw";
import { fakeHand } from "./mockHand";

const apiUrl = process.env.REACT_APP_API_URL!;

const handlers = [
  rest.post(`${apiUrl}users/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "bobby",
        id: "6311947608ed28e35ccabbeb",
      })
    );
  }),

  rest.post(`${apiUrl}users/login`, async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzBkMDBjMTE1MDllNTE2N2JiN2Y1YmIiLCJpYXQiOjE2NjIwOTY0NzB9.tVQVAvCBc5CXN7-GQirdI67Q8Zuzae0EQmVBhPow11s",
      })
    );
  }),

  rest.get(`${apiUrl}hands`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userHands: [fakeHand],
      })
    );
  }),

  rest.post(`${apiUrl}hands/create`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json("Hand created successfully"));
  }),

  rest.put(`${apiUrl}hands/edit/1234`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json("Hand edited successfully"));
  }),

  rest.delete(`${apiUrl}hands/delete/1234`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json("Hand deleted successfully"));
  }),

  rest.get(`${apiUrl}hands/1234`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ fakeHand }));
  }),

  rest.get(`${apiUrl}hands/filter/bobsponge`, async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([fakeHand]));
  }),
];

export default handlers;
