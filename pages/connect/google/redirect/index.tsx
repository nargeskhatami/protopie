import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Grid/Flex";
import Layout from "@/components/Layouts/Layout";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
  menu: DocumentationMenu[];
};

export default function GoogleLoginRedirect(props: Props) {
  const { footerInfo, navigation, menu } = props;
  const [text, setText] = useState("لطفا صبر کنید ...");
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (router.query.access_token)
      axios(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/auth/google/callback?access_token=${router.query.access_token}`
      )
        .then((res) => {
          // Successfully logged with Strapi
          // Now saving the jwt to use it for future authenticated requests to Strapi
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("username", res.data.user.username);
          setText("در حال انتقال به صفحه ی اصلی ...");
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setText("خطایی رخ داده است !");
        });
  }, [router.query]);

  return (
    <Layout footerInfo={footerInfo} navigation={navigation}>
      <Head>
        <title>redirect</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
      </Head>
      <FullHeightContainer>
        <Space isMobile={isMobile} />
        <Flex justify="center" align="center">
          {text}
        </Flex>
        <Space isMobile={isMobile} />
      </FullHeightContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [navigation, footerInfo] = await Promise.all([
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/navigation"),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/footer-info"),
    ]);

    return {
      props: {
        navigation: navigation.data,
        footerInfo: footerInfo.data,
      },
    };
  } catch (error) {
    return;
  }
}

const FullHeightContainer = styled(Container)`
  min-height: 100vh;
`;

const Space = styled.div<{ isMobile: boolean }>`
  height: ${(props) => (props.isMobile ? "20px" : "200px")};
  background-image: ${(props) =>
    props.isMobile ? "initial" : "url(/images/lines.png)"};
  margin: ${tokens.spacingVerticalXXXL} 0;
}
`;
