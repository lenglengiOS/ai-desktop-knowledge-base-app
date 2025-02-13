import React, { FC, forwardRef } from "react";
import { LHLMarkdownContent } from "..";

interface Iprops {
  content: string;
  index: number;
}

const LHLMessageItem: FC<Iprops> = forwardRef(({ content }, ref) => {
  return <LHLMarkdownContent content={content} />;
});

export default LHLMessageItem;
