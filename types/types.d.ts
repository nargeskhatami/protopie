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

interface Blog {
  id: number;
  attributes: Attributes;
}
[];

interface Attributes {
  title: string;
  readDuration: number;
  slug: string;
  image: Image;
  category_id: CategoryId;
}

interface Image {
  data?: Data;
}

interface Data {
  id: number;
  attributes: ImageAttributes;
}

interface ImageAttributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface Formats {
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

interface CategoryId {
  data: {
    id: number;
    attributes: CategoryAttributes;
  };
}

interface CategoryAttributes {
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
