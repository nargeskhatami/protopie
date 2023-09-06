// ------------- Menu -------------

interface Menu {
  id: number;
  title: string;
  path: string;
  type: string;
  slug: string;
  items: Menu[];
}

// ------------- Home -------------

interface Hero {
  images: LinkItem[];
  mainLink: LinkItem;
  subTitle: SubTitle;
  mainTitle: MainTitle;
  secondLink: LinkItem;
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

interface LinkItem {
  url: string;
  text: string;
}

interface Brainstorm {
  title: string;
  subTitle: string;
}

// ------------- Footer -------------

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

// ------------- Blog -------------

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
  createdAt: string;
  text?: string;
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

// ------------- Documentation -------------

interface DocumentationMenu {
  id: number;
  attributes: DocumentationMenuAttributes;
}

interface DocumentationMenuAttributes {
  title: string;
  subMenu?: SubMenu[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  active: boolean;
}

interface SubMenu {
  slug: string;
  title: string;
}

interface Documentation {
  id: number;
  attributes: DocumentationAttributes;
}

interface DocumentationAttributes {
  slug: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ------------- Login -------------

type AuthComponent = "Register" | "Login" | "ForgotPassword";

interface LoginForm {
  component: AuthComponent;
  email: string;
  password?: string;
  username?: string;
}
