// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud } from "react-feather";

const FileUploaderSingle = ({ setFiles, files, Title, image }) => {
  // ** State

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...acceptedFiles.map((file) => Object.assign(file))]);
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="80"
          width="80"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = (file) => (
    <ListGroupItem
      key={`${files[file].name}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center justify-content-center">
        <div className="file-preview me-1">
          {renderFilePreview(files[file])}
        </div>
        <div>
          <p className="file-name mb-0">{files[file].name}</p>
          <p className="file-size mb-0">{renderFileSize(files[file].size)}</p>
        </div>
      </div>
    </ListGroupItem>
  );

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            {image ? (
              <img
                style={{ width: "200px" }}
                alt="user-avatar"
                src={image}
                className="img-fluid rounded mb-2"
              />
            ) : (
              <DownloadCloud size={64} />
            )}
            <h5>برای وارد کردن {Title} کلیک کنید یا فایل را به اینجا بکشید</h5>
            <p className="text-secondary">
              فایل را به اینجا بکشید یا کلیک کنید{" "}
            </p>
          </div>
        </div>
        {files && files.length > 0 ? (
          <Fragment>
            <ListGroup className="my-2">{fileList(0)}</ListGroup>
            <div className="d-flex justify-content-end">
              <Button
                className="me-1"
                color="danger"
                outline
                onClick={handleRemoveAllFiles}
              >
                حذف عکس
              </Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default FileUploaderSingle;
