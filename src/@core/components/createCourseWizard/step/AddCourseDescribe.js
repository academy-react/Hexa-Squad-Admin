import { Button, Card, CardHeader } from "reactstrap";
import { Fragment } from "react";
import { ArrowLeft } from "react-feather";
import EditorJsComponent from "../../EditorJs";

const AddCourseDescribe = ({ setDescribe, stepper, onSubmit }) => {
  return (
    <div
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <CardHeader className="mt-2  mb-4">
          <h2>توضیحات دوره را وارد کنید</h2>
        </CardHeader>
        <EditorJsComponent setDescribe={setDescribe} />
        {/* <textarea
          className="form-control"
          placeholder="توضیحات دوره"
          onChange={(v) => {
            setDescribe(v.target.value);
          }}
        /> */}
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
    </div>
  );
};

export default AddCourseDescribe;
