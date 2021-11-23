import { Button, Form, Input, message, Switch } from "antd";
import { useState } from "react";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { UploadClip } from "../../interface";
import DropZone from "../DropZone/DropZone";
import "./index.css";
import { upload } from "./util";

const UploadForm = () => {
  const [form] = Form.useForm();
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");
  const { TextArea } = Input;

  const handleAddVideo = (file: any) => {
    form.setFieldsValue({ video: file });
    setVideo(file);
  };

  const onFinish = (values: UploadClip) => {
    message.loading("Uploading . . .");
    values.permission = values.permission ? "public" : "private";
    setIsLoading(true);
    upload({ token: canAccessService(), body: values })
      .then(() => {
        message.success("Uploading success");
        setIsLoading(false);
        window.location.href = `/${username}`;
      })
      .catch((err) => {
        setIsLoading(false);

        message.error("Found some error. Please try again.");
      });
  };

  return (
    <div style={{ padding: "48px" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="video"
          rules={[{ required: true, message: "Please upload your clip" }]}
        >
          <DropZone handleAddVideo={handleAddVideo} file={video} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Clip name"
          rules={[{ required: true, message: "Please select title clip" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please describe your clip" }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="permission"
          initialValue={true}
          valuePropName="checked"
        >
          <Switch
            checkedChildren="public"
            unCheckedChildren="private"
            defaultChecked
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="upload-button"
            loading={isLoading}
          >
            Upload clip
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadForm;
