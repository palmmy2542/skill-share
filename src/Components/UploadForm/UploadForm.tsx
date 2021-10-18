import { Upload, Button, Input, Form } from "antd";

import { file } from "@babel/types";
import { useState } from "react";
import { upload } from "./util";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { UploadClip } from "../../interface";
import DropZone from "../DropZone/DropZone";
import "./index.css";

const UploadForm = () => {
  const [form] = Form.useForm();
  const [video, setVideo] = useState();
  const { canAccessService } = useUserAuthenticationContext();
  const { TextArea } = Input;

  const handleAddVideo = (file: any) => {
    form.setFieldsValue({ video: file });
    setVideo(file);
  };

  const onFinish = (values: UploadClip) => {
    upload({ token: canAccessService(), body: values });
  };

  return (
    <div className="upload-layout">
      <Form
        form={form}
        layout="vertical"
        className="upload-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="video"
          rules={[{ required: true, message: "Please upload your clip" }]}
          style={{ width: "100%" }}
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="upload-button"
          >
            Upload clip
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadForm;
