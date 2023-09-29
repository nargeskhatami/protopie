import tokens from "@/config/tokens";
import useIsMobile from "@/hooks/useIsMobile";
import { Body2 } from "@fluentui/react-components";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface Props {
  content?: string;
}

const BlogContent = (props: Props) => {
  const { content } = props;
  const isMobile = useIsMobile();
  return (
    <Article>{content && <ReactMarkdown>{content}</ReactMarkdown>}</Article>
  );
};

export default BlogContent;

const Article = styled.article`
  padding: ${tokens.spacingVerticalL} 0;
  font-size: ${tokens.fontSizeBase400};
  line-height: 2;
  img {
    width: 100%;
    position: relative;
    margin: ${tokens.spacingVerticalL} 0;
    border-radius: ${tokens.borderRadiusXLarge};
  }
`;
