import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const homepageUrl = new URL(`${process.env.APP_API_BASEURL}/homepage`);

        const params = new URLSearchParams(req.query as Record<string, string>);
        homepageUrl.search = params.toString();

        const homepage = await axios.get(homepageUrl.toString());

        const { hero, footerInfo, brainstorm } = homepage.data.data.attributes;

        res.status(200).json({ hero, footerInfo, brainstorm });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
