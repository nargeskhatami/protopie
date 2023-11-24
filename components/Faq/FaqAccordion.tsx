import Flex from "@/components/Common/Grid/Flex";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import { Body1, Body1Strong, makeStyles } from "@fluentui/react-components";
import styled from "styled-components";

type SingleFaq = {
  id: number;
  attributes: FaqListAttributes;
};

type Props = {
  faqs: FaqItem[];
  selectedFaq: SingleFaq;
  setSelectedFaq: (faq: SingleFaq) => void;
};

const RenderMenu = (props: Props) => {
  const { faqs, selectedFaq, setSelectedFaq } = props;
  const styles = useStyles();

  return faqs.map((faqListHeading, faqListHeadingIndex) => {
    return (
      <SideBarList key={`SideBarList${faqListHeadingIndex}`}>
        <li>
          <Body1Strong>{faqListHeading.attributes.title}</Body1Strong>
        </li>
        {faqListHeading.attributes.faqs.data.length ? (
          <SideBarInnerList>
            {faqListHeading.attributes.faqs.data.map(
              (faqItem, faqItemIndex) => (
                <FaqItem
                  key={`faqItem${faqItemIndex}`}
                  onClick={() => setSelectedFaq(faqItem)}
                  className={
                    selectedFaq.attributes.title === faqItem.attributes.title
                      ? "active"
                      : ""
                  }
                >
                  <Body1 className={styles.faqItem}>
                    {faqItem.attributes.title}
                  </Body1>
                </FaqItem>
              )
            )}
          </SideBarInnerList>
        ) : null}
      </SideBarList>
    );
  });
};
const FaqAccordion = (props: Props) => {
  const isMobile = useIsMobile();
  return (
    <Flex
      column
      gap={tokens.spacingHorizontalXXL}
      style={{ marginBottom: isMobile ? tokens.spacingVerticalXXL : 0 }}
    >
      {RenderMenu(props)}
    </Flex>
  );
};
export default FaqAccordion;

const useStyles = makeStyles({
  faqItem: {
    color: tokens.colorNeutralForeground4,
    cursor: "pointer",
    paddingLeft: tokens.spacingHorizontalM,
    ":hover": {
      color: tokens.colorPaletteRedBackground1,
      boxShadow: "-2px 0",
    },
  },
});

const SideBarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalMNudge};
`;

const SideBarInnerList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXS};
`;

const FaqItem = styled.li`
  &.active > span {
    color: ${tokens.colorPaletteRedBackground1};
    box-shadow: 2px 0;
  }
`;
