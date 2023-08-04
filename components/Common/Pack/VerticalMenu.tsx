import { Body1, makeStyles, tokens } from "@fluentui/react-components";
import Link from "next/link";
import styled from "styled-components";
import Flex from "../Grid/Flex";

type Props = {
  title?: string;
  menuIndex: number;
  menuItems: SubMenu[];
};

export default function VerticalMenu(props: Props) {
  const { title, menuItems, menuIndex } = props;
  const styles = useStyles();

  return (
    <Flex column className={styles.Wrapper} gap={16}>
      {title && <Body1 as="h4">{title}</Body1>}
      <Menu>
        {menuItems.map((item, index) => (
          <Body1 key={`menu-${menuIndex}-item-${index}`} className={styles.menuItem}>
            <MenuLink href={item.path}>{item.title}</MenuLink>
          </Body1>
        ))}
      </Menu>
    </Flex>
  );
}

const useStyles = makeStyles({
  Wrapper: {
    marginBottom: tokens.spacingVerticalXXXL,
  },
  menuItem: {
    color: tokens.colorNeutralForeground3,
  },
});

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacingVerticalXS};
`;

const MenuLink = styled(Link)`
  :hover {
    color: ${tokens.colorBrandBackgroundHover};
  }
`;
