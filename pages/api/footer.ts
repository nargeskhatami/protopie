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
        const footerInfo = await axios(
          `${process.env.APP_API_BASEURL}/footerinfo`
        );

        let { links, SocialMedias } = footerInfo.data.data.attributes.data;

        links = links.map(
          (link: {
            title: string;
            subMenus: { title: string; path: string }[];
          }) => ({
            title: link.title,
            subMenus: link.subMenus.map((menu) => ({
              title: menu.title,
              slug: menu.path,
            })),
          })
        );

        res.status(200).json({ links, SocialMedias });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
