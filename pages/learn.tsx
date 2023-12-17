import Container from "@/components/Common/Container";
import Layout from "@/components/Layouts/Layout";
import Head from "next/head";
import styled from "styled-components";
import Flex from "@/components/Common/Grid/Flex";
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "axios";
import { learn1, learn2 } from "@/constants/learn-content";
import Heading from "@/components/Common/Pack/Heading";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
};

const breadcrumbItems = [
  { label: "صفحه نخست", link: "/" },
  { label: "آموزش پروتوپای", link: "/learn" },
];

export default function Learn(props: Props) {
  const { footerInfo, navigation } = props;
  const isMobile = useIsMobile();

  return (
    <Layout footerInfo={footerInfo} navigation={navigation}>
      <Head>
        <title>آموزش پروتوپای</title>
      </Head>
      <Container>
        <Heading title="آموزش پروتوپای" />
        <Breadcrumb items={breadcrumbItems} />
        <Wrapper
          column
          align="center"
          justify="center"
          gap={tokens.spacingVerticalXXXL}
          style={{ marginTop: tokens.spacingVerticalXXXL }}
        >
          <div dangerouslySetInnerHTML={{ __html: learn1 }} />
          <ReactHlsPlayer
            src={`${process.env.NEXT_PUBLIC_ADMIN_URL}/uploads/output_96a6005e74.m3u8`}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
          />
          <div dangerouslySetInnerHTML={{ __html: learn2 }} />
        </Wrapper>
        <Space isMobile={isMobile} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [navigation, footerInfo] = await Promise.all([
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/navigation"),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/footer"),
    ]);

    return {
      props: {
        footerInfo: footerInfo.data,
        navigation: navigation.data,
      },
    };
  } catch (error) {
    return;
  }
}

const Wrapper = styled(Flex)`
  position: relative;
  img {
    width: 100%;
  }
`;

const Space = styled.div<{ isMobile: boolean }>`
  height: ${(props) => (props.isMobile ? "20px" : "200px")};
  background-image: ${(props) =>
    props.isMobile ? "initial" : "url(images/lines.png)"};
  margin: ${tokens.spacingVerticalXXXL} 0;
}
`;
