import { Upload, Button, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadForm = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <div className="upload-layout">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="text"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />} className="file-button" size="large">
          Select file
        </Button>
      </Upload>
      <Form form={form} layout="vertical" className="upload-form">
        <Form.Item label="Clip name">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
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
