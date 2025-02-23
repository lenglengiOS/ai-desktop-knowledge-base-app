import React, { FC } from "react";
import styles from "./setting.module.css";
import { Input, Button, Form, FormProps, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SettingStateType } from "../../store/reducers/settingReducer";
import { ReducersType } from "../../store/reducers";
import { testConnect } from "../../api/request";
import { updateConfigAction } from "../../store/actions/settingAction";

interface Iprops {}

export type FieldType = {
  name: string;
  apiKey: string;
  baseURL: string;
  model: string;
};
let dispatch: (arg0: any) => void;
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("onFinish", values);
  const { name, apiKey, baseURL, model }: FieldType = values;

  message.loading("正在测试...");
  testConnect({
    config: { apiKey, baseURL, model },
    onFinish: (msg) => {
      message.destroy();
      message.success(msg);
      dispatch(updateConfigAction({ name, apiKey, baseURL, model }));
    },
    onError: (msg) => {
      message.destroy();
      message.error(msg);
    },
  });
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LHLSetting: FC<Iprops> = ({}) => {
  const { name, apiKey, baseURL, model }: SettingStateType =
    useSelector<ReducersType>((state) => state.setting);
  dispatch = useDispatch();
  return (
    <div className={styles["container"]}>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: 600 }}
        initialValues={{ name, apiKey, baseURL, model }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="平台名称"
          name="name"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="apiKey"
          name="apiKey"
          rules={[{ required: true, message: "请输入apiKey" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="baseURL"
          name="baseURL"
          rules={[{ required: true, message: "请输入baseURL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="model"
          name="model"
          rules={[{ required: true, message: "请输入模型名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LHLSetting;
