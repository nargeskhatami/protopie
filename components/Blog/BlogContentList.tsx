import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  Body2,
  Link,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  anchors: Blog["attributes"]["anchors"];
}

const renderAnchors = (props: Props) => {
  const { anchors } = props;
  const [selectedAnchor, setSelectedAnchor] = useState("");

  return (
    anchors && (
      <AnchorsList>
        {anchors.map((anchor) => (
          <AnchorListItem
            className={selectedAnchor === anchor.link ? "active" : ""}
          >
            <Body1 style={{ display: "block" }}>
              <Link
                href={`#${anchor.link}`}
                appearance="subtle"
                onClick={() => setSelectedAnchor(anchor.link)}
              >
                {anchor.name}
              </Link>
            </Body1>
          </AnchorListItem>
        ))}
      </AnchorsList>
    )
  );
};

const BlogContentList = (props: Props) => {
  const { anchors } = props;

  const styles = useStyles();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Accordion collapsible className={styles.mobileAccordin}>
          <AccordionItem value={"MobileAccordion"}>
            <AccordionHeader
              className={styles.accordionHeader}
              expandIconPosition="end"
              expandIcon={<ChevronDownIcon width={20} />}
            >
              <Body2>فهرست محتوا</Body2>
            </AccordionHeader>
            <AccordionPanel>
              <Accordion collapsible multiple className={styles.accordion}>
                {renderAnchors({ anchors })}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <Body2 color={tokens.colorNeutralForeground3}>فهرست محتوا</Body2>
          {renderAnchors({ anchors })}
        </>
      )}
    </>
  );
};

export default BlogContentList;

const AnchorsList = styled.ul`
  list-style-type: none;
  padding: ${tokens.spacingVerticalSNudge} 0;
  margin: 0;
`;

const AnchorListItem = styled.ul`
  list-style-type: none;
  padding: ${tokens.spacingVerticalSNudge} 0;
  position: relative;
  & a {
    display: block;
    :hover {
      text-decoration-line: none;
    }
  }
  &.active {
    & a {
      color: ${tokens.colorPaletteRedBackground1};
    }
    :before {
      content: "";
      display: block;
      height: 32px;
      width: 2px;
      background: ${tokens.colorPaletteRedBackground1};
      position: absolute;
      left: calc(100% + ${tokens.spacingVerticalXXL} - 2px);
      top: 0;
    }
  }
`;

const useStyles = makeStyles({
  accordion: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalMNudge,
    maxHeight: "600px",
    position: "sticky",
    top: "10px",
    ...shorthands.overflow("auto"),
    "::-webkit-scrollbar": {
      width: "4px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: tokens.colorNeutralForeground4,
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
  },
  mobileAccordin: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  accordionHeader: {
    "> button": {
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    "> button:hover": {
      color: tokens.colorNeutralForeground2Hover,
    },
    "> button[aria-expanded='true'] > span > svg": {
      transform: "rotate(-180deg)",
    },
  },
});
