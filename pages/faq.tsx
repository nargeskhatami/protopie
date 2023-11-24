import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import Container from "@/components/Common/Container";
import Col from "@/components/Common/Grid/Col";
import Flex from "@/components/Common/Grid/Flex";
import Heading from "@/components/Common/Pack/Heading";
import FaqAccordion from "@/components/Faq/FaqAccordion";
import Layout from "@/components/Layouts/Layout";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Body1,
  Body1Strong,
  Body2,
  Title3,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  footerInfo: FooterInfo;
  navigation: Menu[];
  faqs: FaqItem[];
};

const breadcrumbItems = [
  { label: "صفحه نخست", link: "/" },
  { label: "سوالات متداول", link: "/faq" },
];
export default function FAQ(props: Props) {
  const { footerInfo, navigation, faqs } = props;
  const styles = useStyles();
  const isMobile = useIsMobile();
  const [selectedFaq, setSelectedFaq] = useState(
    faqs[0].attributes.faqs.data[0]
  );
  const [openItems, setOpenItems] = useState<string[]>([]);
  const handleToggle: AccordionToggleEventHandler = (event, data) => {
    const clickedItem = data.value as string;
    const _openItems = new Set(openItems);
    if (_openItems.has(clickedItem)) {
      _openItems.delete(clickedItem);
    } else {
      _openItems.add(clickedItem);
    }
    setOpenItems(Array.from(_openItems));
  };
  return (
    <Layout footerInfo={footerInfo} navigation={navigation}>
      <Head>
        <title>سوالات متداول</title>
      </Head>
      <Container>
        <Heading title="سوالات متداول" />
        <Breadcrumb items={breadcrumbItems} />

        <Flex
          style={{ padding: `${tokens.spacingVerticalXXXL} 0` }}
          column={isMobile}
        >
          <Col size={isMobile ? 12 : 3}>
            <FaqAccordion
              faqs={faqs}
              selectedFaq={selectedFaq}
              setSelectedFaq={setSelectedFaq}
            />
          </Col>
          <Col size={isMobile ? 12 : 9}>
            <Flex column gap={tokens.spacingVerticalL}>
              <Title3>{selectedFaq.attributes.title}</Title3>
              <Accordion
                collapsible
                multiple
                className={styles.accordion}
                openItems={openItems}
                onToggle={handleToggle}
              >
                {selectedFaq.attributes.faq_lists.data.map((item, index) => (
                  <AccordionItem
                    key={`faq-key-${index}`}
                    value={`faq-${index}`}
                    className={styles.accordionItem}
                  >
                    <AccordionHeader
                      className={styles.accordionHeader}
                      expandIcon={
                        openItems.includes(`faq-${index}`) ? (
                          <MinusCircleIcon
                            height={24}
                            color={tokens.colorBrandForeground1}
                          />
                        ) : (
                          <PlusCircleIcon height={24} />
                        )
                      }
                      expandIconPosition="end"
                    >
                      <Body2
                        style={{
                          color: openItems.includes(`faq-${index}`)
                            ? tokens.colorBrandForeground1
                            : tokens.colorNeutralForeground1,
                        }}
                      >
                        {item.attributes.question}
                      </Body2>
                    </AccordionHeader>
                    <AccordionPanel className={styles.accordionPanel}>
                      {item.attributes.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Flex>
          </Col>
        </Flex>
        <Space isMobile={isMobile} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [navigation, faqs, footerInfo] = await Promise.all([
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/navigation"),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/faq"),
      axios.get(process.env.NEXT_PUBLIC_APP_BASEURL + "/api/footer"),
    ]);

    return {
      props: {
        footerInfo: footerInfo.data,
        faqs: faqs.data,
        navigation: navigation.data,
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

const useStyles = makeStyles({
  accordion: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  accordionItem: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.overflow("hidden"),
  },
  accordionHeader: {
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingRight: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingVerticalL,
  },
  accordionPanel: {
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingRight: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingVerticalL,
    width: "80%",
    marginLeft: "auto",
    color: tokens.colorNeutralForeground3,
  },
});
