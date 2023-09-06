import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const blogsUrl = new URL(`${process.env.APP_API_BASEURL}/blogs`);

        const params = new URLSearchParams(req.query as Record<string, string>);
        blogsUrl.search = params.toString();

        const blogs = await axios.get(blogsUrl.toString());
        const isSingle = req.query["filters[slug][$eq]"];
        const { data } = blogs.data;

        res.status(200).json(isSingle ? data[0] : data);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
