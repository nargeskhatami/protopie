import ButtonFullWidth from "@/components/Common/Button/ButtonBlock";
import Flex from "@/components/Common/Grid/Flex";
import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

type Props = {
  menu: DocumentationMenu[];
  refetch: () => void;
  setSlug: (slug: string) => void;
};

const RenderMenu = (props: Props) => {
  const { menu, refetch, setSlug } = props;
  const styles = useStyles();
  const isMobile = useIsMobile();

  return menu.map(({ attributes: menuItem, id }) => {
    return menuItem.subMenu ? (
      <AccordionItem key={`doc-menu-${id}`} value={id}>
        <AccordionHeader
          className={styles.accordionHeader}
          expandIconPosition="end"
          expandIcon={<ChevronDownIcon width={12} />}
        >
          {menuItem.title}
        </AccordionHeader>
        <AccordionPanel className={isMobile ? "" : styles.accordionPanel}>
          <Flex column className={styles.menuWrapper} gap={16}>
            <Menu>
              {menuItem.subMenu.map((item, index) => (
                <Body1 key={`menu-${id}-item-${index}`}>
                  <MenuItem
                    appearance="transparent"
                    size="small"
                    onClick={() => {
                      setSlug(item.slug);
                      refetch();
                    }}
                  >
                    {item.title}
                  </MenuItem>
                </Body1>
              ))}
            </Menu>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    ) : (
      <ButtonFullWidth
        key={`doc-menu-${id}`}
        appearance="subtle"
        size="large"
        style={{ height: "44px" }}
        className={styles.buttonItem}
      >
        <Body1>{menuItem.title}</Body1>
      </ButtonFullWidth>
    );
  });
};

export default function DocumentAccordion(props: Props) {
  const { menu, refetch, setSlug } = props;
  const styles = useStyles();
  const isMobile = useIsMobile();

  return isMobile ? (
    <Accordion collapsible className={styles.mobileAccordin}>
      <AccordionItem value={"MobileAccordion"}>
        <AccordionHeader
          className={styles.accordionHeader}
          expandIconPosition="end"
          expandIcon={<ChevronDownIcon width={12} />}
        >
          فهرست محتوا
        </AccordionHeader>
        <AccordionPanel>
          <Accordion collapsible multiple className={styles.accordion}>
            {RenderMenu({ menu, refetch, setSlug })}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <Accordion collapsible multiple className={styles.accordion}>
      {RenderMenu({ menu, refetch, setSlug })}
    </Accordion>
  );
}

const useStyles = makeStyles({
  copyWrite: {
    color: tokens.colorNeutralForeground4,
  },
  logoCaption: {
    color: tokens.colorNeutralForeground4,
  },
  link: {
    backgroundColor: tokens.colorNeutralBackground3Selected,
    ...shorthands.borderRadius(tokens.spacingVerticalSNudge),
    height: "36px",
    width: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
    backgroundColor: tokens.colorNeutralBackground2,
  },
  buttonItem: {
    justifyContent: "flex-start",
  },
  accordionPanel: {
    marginTop: tokens.spacingVerticalXL,
    ...shorthands.margin(
      tokens.spacingVerticalXL,
      0,
      0,
      tokens.spacingVerticalXL
    ),
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderRightColor: "currentColor",
  },
  accordionHeader: {
    "> button": {
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    "> button:hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,
    },
    "> button[aria-expanded='true'] > span > svg": {
      transform: "rotate(-180deg)",
    },
  },
  menuWrapper: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
});

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXS};
`;
const MenuItem = styled(ButtonFullWidth)`
  justify-content: flex-start !important;
  height: 44px !important;
  padding: 0 ${tokens.spacingVerticalXL} !important;
`;
