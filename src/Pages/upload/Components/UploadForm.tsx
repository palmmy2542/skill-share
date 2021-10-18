import { Upload, Button, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AUTHENTICATION_HOST } from "../../../const";
import DropZone from "../../../Components/DropZone/DropZone";
import { file } from "@babel/types";
import { useState } from "react";

const UploadForm = () => {
  const [form] = Form.useForm();
  const [video, setVideo] = useState();
  const { TextArea } = Input;

  const handleAddVideo = (file: any) => {
    console.log(file);
    form.setFieldsValue({ file: file });
    setVideo(file);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };
  console.log(video);

  return (
    <div className="upload-layout">
      {/* <Upload
        listType="text"
        maxCount={1}
        beforeUpload={(file) => console.log(file)}
      >
        <Button icon={<UploadOutlined />} className="file-button" size="large">
          Select file
        </Button>
      </Upload> */}
      <Form
        form={form}
        layout="vertical"
        className="upload-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="file"
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
        <Form.Item name="description" label="Description">
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
