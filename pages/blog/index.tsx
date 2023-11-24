import BlogCard from "@/components/Blog/BlogCard";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Grid/Flex";
import Heading from "@/components/Common/Pack/Heading";
import Layout from "@/components/Layouts/Layout";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "axios";
import Head from "next/head";
import styled from "styled-components";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
  blogs: Blog[];
};
const breadcrumbItems = [
  { label: "صفحه نخست", link: "/" },
  { label: "بلاگ", link: "/blog" },
];
export default function Blog(props: Props) {
  const { footerInfo, navigation, blogs } = props;
  const isMobile = useIsMobile();

  return (
    <Layout footerInfo={footerInfo} navigation={navigation}>
      <Head>
        <title>بلاگ</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
      </Head>
      <Container>
        <Heading title="بلاگ" />
        <Breadcrumb items={breadcrumbItems} />
        <Space isMobile={isMobile} />
        <Flex column={isMobile} style={{ flexWrap: "wrap" }}>
          {blogs.map((blog, index) => (
            <BlogCard
              key={`blog-${index}`}
              {...blog}
              size={isMobile ? 12 : 3}
            />
          ))}
        </Flex>
        <Space isMobile={isMobile} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [navigation, blogs, footerInfo] = await Promise.all([
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/navigation"),
      axios.get(
        process.env.NEXT_PUBLIC_APP_BASEURL +
          "/api/blogs?fields[0]=title&fields[1]=readDuration&populate=*&fields[2]=slug&fields[3]=category_id&fields[4]=image&pagination[page]=1&pagination[pageSize]=4"
      ),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/footer"),
    ]);

    return {
      props: {
        footerInfo: footerInfo.data,
        navigation: navigation.data,
        blogs: blogs.data,
      },
    };
  } catch (error) {
    return;
  }
}

const Space = styled.div<{ isMobile: boolean }>`
  height: ${(props) => (props.isMobile ? "20px" : "200px")};
  background-image: ${(props) =>
    props.isMobile ? "initial" : "url(images/lines.png)"};
  margin: ${tokens.spacingVerticalXXXL} 0;
}
`;
