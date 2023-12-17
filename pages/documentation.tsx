import BlogContent from "@/components/Blog/BlogContent";
import Container from "@/components/Common/Container";
import Col from "@/components/Common/Grid/Col";
import Flex from "@/components/Common/Grid/Flex";
import { IndeterminateBar } from "@/components/Common/Progress/IndeterminateBar";
import DocumentAccordion from "@/components/Document/DocumentAccordion";
import Layout from "@/components/Layouts/Layout";
import tokens from "@/config/tokens";
import useDocumentation from "@/hooks/useDocumentation";
import useIsMobile from "@/hooks/useIsMobile";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
  menu: DocumentationMenu[];
};

export default function Documentation(props: Props) {
  const { footerInfo, navigation, menu } = props;
  const [slug, setSlug] = useState("/getting-started");
  const isMobile = useIsMobile();

  const { data, isLoading, isFetching, refetch } = useDocumentation(slug);

  return (
    <Layout footerInfo={footerInfo} navigation={navigation}>
      <Head>
        <title>داکیومنت</title>
      </Head>
      <Container>
        <Flex
          style={{
            padding: `${tokens.spacingVerticalXXXL} 0`,
            minHeight: "100vh",
          }}
          column={isMobile}
        >
          <Col size={isMobile ? 12 : 3}>
            <DocumentAccordion
              setSlug={setSlug}
              refetch={refetch}
              menu={menu}
            />
          </Col>
          <Col size={isMobile ? 12 : 9}>
            {isLoading || isFetching ? (
              <IndeterminateBar />
            ) : data.length ? (
              <BlogContent content={data[0].attributes.text} />
            ) : (
              "محتوایی یافت نشد !"
            )}
          </Col>
        </Flex>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [navigation, menu, footerInfo] = await Promise.all([
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/navigation"),
      axios.get(
        process.env.NEXT_PUBLIC_APP_BASEURL + "/api/documentation/menu"
      ),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/footer"),
    ]);

    return {
      props: {
        menu: menu.data,
        navigation: navigation.data,
        footerInfo: footerInfo.data,
      },
    };
  } catch (error) {
    return;
  }
}

const Pre = styled.pre`
  white-space: break-spaces;
  font-family: "YekanBakh";
  line-height: 2rem;
`;
