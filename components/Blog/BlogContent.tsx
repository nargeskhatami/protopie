import tokens from "@/config/tokens";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface Props {
  content?: string;
}

const BlogContent = (props: Props) => {
  const { content } = props;
  return (
    <Article>{content && <ReactMarkdown>{content}</ReactMarkdown>}</Article>
  );
};

export default BlogContent;

const Article = styled.article`
  padding: ${tokens.spacingVerticalL} 0;
  font-size: ${tokens.fontSizeBase400};
  font-weight: 100;
  line-height: 2;
  img {
    width: 100%;
    position: relative;
    margin: ${tokens.spacingVerticalL} 0;
    border-radius: ${tokens.borderRadiusXLarge};
  }
  h1,
  h2,
  h3,
  h4 {
    padding: ${tokens.spacingVerticalXXXL} 0 ${tokens.spacingVerticalXXS};
  }
`;
