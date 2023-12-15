import { Fragment } from "react";
import FileUploaderSingle from "../../../@core/components/FileUploaderSingle";
import { Button, CardBody, CardHeader } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";

const ChangeImage = ({ image, files, setFiles, stepper }) => {
  return (
    <Fragment>
      <CardHeader className="mt-2  mb-4">
        <h2>تصویر دوره را وارد کنید</h2>
      </CardHeader>
      <CardBody className="cursor-pointer">
        <FileUploaderSingle
          image={image}
          files={files}
          Title={"عکس دوره"}
          setFiles={setFiles}
        />
      </CardBody>

      <div className="d-flex justify-content-between mt-3 ">
        <Button
          color="secondary"
          className="btn-prev"
          outline
          disabled
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            قدم قبلی
          </span>
        </Button>
        <Button
          color="primary"
          // type="button"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">
            قدم بعدی
          </span>
          <ArrowLeft
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowLeft>
        </Button>
      </div>
    </Fragment>
  );
};

export default ChangeImage;
