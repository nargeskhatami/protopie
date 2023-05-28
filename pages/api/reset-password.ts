import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { code, password, passwordConfirmation } = req.body;
        const post = await axios.post(process.env.AUTH_BASEURL + "/reset-password", {
          code,
          password,
          passwordConfirmation,
        });
        res.status(200).json(post.data);
      } catch (error) {
        console.error(error);
        res.status(500).json(error.response.data.error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
