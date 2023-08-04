import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { username, email, password } = req.body;

        const post = await axios.post(`${process.env.APP_AUTH_API_BASEURL}/local/auth/register`, {
          username,
          email,
          password,
        });

        res.status(200).json(post.data);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
