import tokens from "@/config/tokens";
import { toJalali } from "@/helpers/date";
import useIsMobile from "@/hooks/useIsMobile";
import {
  Body1,
  Caption1,
  Image,
  Title3,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import Breadcrumb from "../Common/Breadcrumb/Breadcrumb";
import Flex from "../Common/Grid/Flex";
import styled from "styled-components";

interface Props {
  blog: Blog["attributes"];
}

const BlogHeader = (props: Props) => {
  const { blog } = props;
  const { title, slug, image, category_id, readDuration, createdAt } = blog;

  const breadcrumbItems = [
    { label: "صفحه نخست", link: "/" },
    { label: "بلاگ", link: "/blog" },
    { label: title, link: slug },
  ];

  const isMobile = useIsMobile();
  const styles = useStyles();

  return (
    <Flex gap={24} column>
      <Breadcrumb justify="start" items={breadcrumbItems} />
      <Flex gap={24}>
        {!isMobile && image?.data?.attributes?.formats?.thumbnail && (
          <ThumbnailWrapper>
            <Image
              src={`${process.env.NEXT_PUBLIC_ADMIN_URL}${image.data.attributes.formats.small.url}`}
              alt={title}
              height={150}
            />
          </ThumbnailWrapper>
        )}
        <Flex
          column
          justify="evenly"
          style={{ minWidth: "auto" }}
          gap={isMobile ? 10 : 0}
        >
          <Body1>{category_id.data.attributes.category}</Body1>
          <Title3>{title}</Title3>
          <Flex gap={44}>
            <Caption1
              className={styles.readDuration}
            >{`زمان مطالعه ${readDuration} دقیقه`}</Caption1>
            <Caption1 className={styles.readDuration}>
              {toJalali(createdAt)}
            </Caption1>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogHeader;

const useStyles = makeStyles({
  customLineColor: {
    "::before": {
      ...shorthands.borderColor(tokens.colorNeutralBackground2Pressed),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralBackground2Pressed),
    },
    marginTop: tokens.spacingVerticalXXL,
  },
  readDuration: {
    color: tokens.colorNeutralForeground4,
    fontFamily: "YekanBakhFaNum",
  },
});

const ThumbnailWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: ${tokens.borderRadiusXLarge};
  display: flex;
  align-items: center;
  justify-content: center;
`;
