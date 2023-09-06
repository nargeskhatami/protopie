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
        const documentationUrl = new URL(
          `${process.env.APP_API_BASEURL}/documentations-blogs`
        );

        const params = new URLSearchParams(req.query as Record<string, string>);
        documentationUrl.search = params.toString();

        const documentation = await axios.get(documentationUrl.toString());

        res.status(200).json(documentation.data.data);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
