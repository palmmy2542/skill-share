import { CloseOutlined } from "@ant-design/icons";

const UploadNavbar = () => {
  function goBack() {
    window.history.back();
  }

  return (
    <nav className="navbar">
      <CloseOutlined className="icon icon-close" onClick={goBack} />
      <h1 className="name"> Upload Clip </h1>
    </nav>
  );
};

export default UploadNavbar;
