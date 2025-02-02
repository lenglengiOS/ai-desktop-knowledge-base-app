import { Sender } from "@ant-design/x";
import { App, Flex, message } from "antd";
import React, { useState, FC } from "react";

interface Iprops {}

const LHLSender: FC<Iprops> = () => {
  const [value, setValue] = useState<string>("Hello? this is X!");
  const [loading, setLoading] = useState<boolean>(false);

  // Mock send message
  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        message.success("Send message successfully!");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loading]);

  return (
    <Flex vertical gap="middle">
      <Sender
        loading={loading}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        onSubmit={() => {
          setValue("");
          setLoading(true);
          message.info("Send message!");
        }}
        onCancel={() => {
          setLoading(false);
          message.error("Cancel sending!");
        }}
      />
    </Flex>
  );
};

export default LHLSender;
