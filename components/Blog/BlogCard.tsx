import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Link,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import styled from "styled-components";
import Col from "../Common/Grid/Col";
import Flex from "../Common/Grid/Flex";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
type Props = Blog & { size?: number };

export default function BlogCard(props: Props) {
  const styles = useStyles();
  const { size = 12, attributes } = props;
  const { title, readDuration, slug, image, category_id } = attributes;

  return (
    <Col size={size}>
      <Link
        href={`/blog/${slug}`}
        style={{ textDecoration: "none" }}
        target="_blank"
      >
        <Card appearance="subtle" className={styles.Card}>
          <CardPreview className={styles.CardPreview}>
            {image?.data?.attributes?.url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${image.data.attributes.url}`}
                alt={title}
                className={styles.img}
                fill
                loading="lazy"
              />
            )}
          </CardPreview>
          <CardHeader
            className={styles.CardHeader}
            header={
              <Flex justify="between">
                <Flex align="center" gap={8} style={{ minWidth: "unset" }}>
                  <Button
                    appearance="transparent"
                    className={styles.categoryLink}
                    onClick={() =>
                      window
                        .open(category_id.data.attributes.category, "_blank")
                        ?.focus()
                    }
                  >
                    <Caption1>{category_id.data.attributes.category}</Caption1>
                  </Button>
                  <Caption1
                    className={styles.readDuration}
                  >{`${readDuration} دقیقه مطالعه`}</Caption1>
                </Flex>
                <LinkIcon width={20} height={20} />
              </Flex>
            }
            description={<Body1>{title}</Body1>}
          />
        </Card>
      </Link>
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
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
  },
  img: {
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
  },
  CardHeader: {
    rowGap: tokens.spacingVerticalS,
  },
  categoryLink: {
    height: "28px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    minWidth: "fit-content",
    color: tokens.colorNeutralForeground2,
    ...shorthands.padding(0),
  },
  readDuration: {
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

const LinkIcon = styled(ArrowSmallLeftIcon)<{ width: number; height: number }>`
  transform: rotate(45deg);
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  color: ${tokens.colorNeutralForeground4};
`;
