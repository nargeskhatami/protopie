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
  line-height: 2;
  img {
    width: 100%;
    position: relative;
  }
`;
