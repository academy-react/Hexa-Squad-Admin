import { Button, Card, CardHeader } from "reactstrap";
import EditorJsComponent from "../../EditorJs";
import { Fragment } from "react";
import { ArrowLeft } from "react-feather";

const AddCourseDescribe = ({ setDescribe, stepper, onSubmit }) => {
  return (
    <Fragment>
      <div className="col-8 mx-auto block ">
        <CardHeader className="mt-2  mb-4">
          <h2>توضیحات دوره را وارد کنید</h2>
        </CardHeader>
        <EditorJsComponent setDescribe={setDescribe} />
      </div>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            قدم قبلی
          </span>
        </Button>
        <Button color="success" className="btn-submit" onClick={onSubmit}>
          ساختن دوره
        </Button>
      </div>
    </Fragment>
  );
};

export default AddCourseDescribe;
