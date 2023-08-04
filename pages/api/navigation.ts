import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const navigation = await axios(
          `${process.env.APP_API_BASEURL}/navigation/render/1?type=TREE`
        );

        const result = navigation.data.map((item: Menu) => ({
          id: item.id,
          title: item.title,
          path: item.path,
          items: item.items,
        }));

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
