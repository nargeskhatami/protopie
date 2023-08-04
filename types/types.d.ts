interface Menu {
  id: number;
  title: string;
  path: string;
  type: string;
  slug: string;
  items: Menu[];
}

interface Hero {
  images: Image[];
  mainLink: Image;
  subTitle: SubTitle;
  mainTitle: MainTitle;
  secondLink: Image;
  description: string;
}

interface MainTitle {
  firstPart: string;
  thirdPart: string;
  secondPart: string;
}

interface SubTitle {
  firstPart: string;
  secondPart: string;
}

interface Image {
  url: string;
  text: string;
}

interface FooterInfo {
  links: Link[];
  SocialMedias: SocialMedia[];
}

interface SocialMedia {
  link: string;
  title: string;
}

interface Link {
  title: string;
  subMenus: SubMenu[];
}

interface SubMenu {
  path: string;
  title: string;
}

interface Brainstorm {
  title: string;
  subTitle: string;
}
