import React, { FC } from "react";
import MarkdownIt from "markdown-it";
import markdownItHighlight from "markdown-it-highlight";

const md = new MarkdownIt();
// md.use(markdownItHighlight);

interface Iprops {
  content: string;
}
const MarkdownContent: FC<Iprops> = ({ content }) => {
  const htmlContent = md.render(content);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownContent;
