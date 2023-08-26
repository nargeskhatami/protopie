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
        const blogsUrl = `${process.env.APP_API_BASEURL}/blogs?fields[0]=title&fields[1]=readDuration&populate=*&fields[2]=slug&fields[3]=category_id&fields[4]=image`;

        const blogs = await axios.get(blogsUrl);

        const { data } = blogs.data;

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
