import React, { FC, useRef } from "react";
import { Button, Flex, Tooltip, message } from "antd/es";
import { CopyOutlined, FolderAddOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import AddKnowledgeModal from "../knowledge/addKnowledgeModal";
interface IProps {
  content: string;
  index: number;
  loading: boolean;
}

const BubbleFotter: FC<IProps> = React.memo(
  ({ content, index, loading }: any) => {
    // 添加知识库的ref
    const addModalRef = useRef(null);

    const copyContent = () => {
      copy(content);
      message.success("已复制到粘贴板");
    };

    const add = () => {
      if (addModalRef.current) {
        addModalRef.current.showModal();
      }
    };

    return (
      <>
        <Flex>
          <Tooltip title="复制到粘贴板">
            <Button
              disabled={loading}
              onClick={copyContent}
              size="middle"
              type="text"
              icon={<CopyOutlined />}
            />
          </Tooltip>
          <Tooltip title="添加到知识库">
            <Button
              disabled={loading}
              onClick={add}
              size="middle"
              type="text"
              icon={<FolderAddOutlined />}
            />
          </Tooltip>
        </Flex>
        <AddKnowledgeModal ref={addModalRef} content={content} />
      </>
    );
  }
);

export default BubbleFotter;
