import { Button, CardBody, CardHeader } from "reactstrap";
import FileUploaderSingle from "../../../@core/components/FileUploaderSingle";
import { Fragment } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

const AddImage = ({ files, setFiles, stepper }) => {
  return (
    <Fragment>
      <CardHeader className="mt-2  mb-4">
        <h2>تصویر دوره را وارد کنید</h2>
      </CardHeader>
      <CardBody className="cursor-pointer">
        <FileUploaderSingle
          files={files}
          Title={"عکس دوره"}
          setFiles={setFiles}
        />
      </CardBody>

      <div className="d-flex justify-content-between ">
        <Button color="secondary" className="btn-prev" outline disabled>
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
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">
            قدم بعدی
          </span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default AddImage;
