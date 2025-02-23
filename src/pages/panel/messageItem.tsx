import React, { FC, forwardRef } from "react";
import { LHLMarkdownContent } from "../../components";

interface Iprops {
  content: string;
  index: number;
  placement: string;
}

const LHLMessageItem: FC<Iprops> = forwardRef(({ content, placement }, ref) => {
  if (placement === "end")
    return (
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          margin: 12,
          padding: 0,
        }}
      >
        {content}
      </pre>
    );
  return <LHLMarkdownContent content={content} />;
});

export default LHLMessageItem;
