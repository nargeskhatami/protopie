import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Link,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import Col from "../Common/Grid/Col";
import Flex from "../Common/Grid/Flex";

type Props = {
  category: string;
  categoryLink?: string;
  title: string;
  readTime: number;
  url: string;
  image: string;
};

export default function BlogCard(props: Props) {
  const styles = useStyles();
  const { category, title, readTime, url, image, categoryLink } = props;
  return (
    <Col>
      <Card appearance="subtle" className={styles.Card}>
        <CardPreview className={styles.CardPreview}>
          <img src={image} alt={title} className={styles.img} />
        </CardPreview>
        <CardHeader
          className={styles.CardHeader}
          header={
            <Flex justify="between">
              <Flex align="center" gap={8}>
                <Link href={categoryLink} className={styles.categoryLink}>
                  <Caption1>{category}</Caption1>
                </Link>
                <Caption1 className={styles.readTime}>{`${readTime} دقیقه مطالعه`}</Caption1>
              </Flex>
              <LinkIcon width={20} height={20} />
            </Flex>
          }
          description={<Body1>{title}</Body1>}
        />
      </Card>
    </Col>
  );
}

const useStyles = makeStyles({
  Card: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  CardPreview: {
    marginLeft: "0 !important",
    marginRight: "0 !important",
  },
  img: {
    ...shorthands.borderRadius(tokens.spacingVerticalS),
  },
  CardHeader: {
    rowGap: tokens.spacingVerticalS,
  },
  categoryLink: {
    height: "28px",
    display: "flex",
    alignItems: "center",
  },
  readTime: {
    color: tokens.colorNeutralForeground4,
    height: "28px",
    display: "flex",
    alignItems: "center",
    fontFamily: "YekanBakhFaNum",
    "&:before": {
      content: '""',
      width: tokens.spacingVerticalXS,
      height: tokens.spacingVerticalXS,
      backgroundColor: tokens.colorNeutralStroke2,
      display: "block",
      marginRight: tokens.spacingHorizontalS,
      ...shorthands.borderRadius("50%"),
    },
  },
});

const LinkIcon = styled(ArrowSmallLeftIcon)`
  transform: rotate(45deg);
  color: ${tokens.colorNeutralForeground4};
`;
