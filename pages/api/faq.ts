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
        const faq = await axios.get(
          `${process.env.APP_API_BASEURL}/faq-titles?populate[faqs][populate]=*`
        );

        res.status(200).json(faq.data.data);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
