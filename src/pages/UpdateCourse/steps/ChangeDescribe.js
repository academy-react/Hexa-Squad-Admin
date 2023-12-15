import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "react-feather";
import { Button } from "reactstrap";
import FormikInput from "../../../@core/components/FormikInput";
import EditorJsComponent from "../../../@core/components/EditorJs";

const ChangeDescribe = ({ stepper, describe ,setOriginalDescribe}) => {
  const [Describe, setDescribe] = useState();
  const [acceptToEditor, setAcceptToEditor] = useState(false);
  const accept = () => {
    setAcceptToEditor(true);
  };
  useEffect(() => {
    if (describe) {
      console.log("describe", describe);
      if (describe.includes("blocks", "{", "}")) {
        const newDescribe = JSON.parse(describe);
        setDescribe(newDescribe);
        console.log("describe json", describe);
      } else {
        setDescribe(describe);
      }
    }
  }, [describe]);
  return (
    <Fragment>
      {(typeof Describe === "object" && Describe !== null) || acceptToEditor ? (
        <EditorJsComponent defaultData={Describe} setDescribe={setOriginalDescribe} />
      ) : (
        <Fragment>
          <FormikInput
            name={"Describe"}
            addClass={"mt-1"}
            inputClassName={"h-48"}
            as={"textarea"}
          >
            توضیحات دوره
          </FormikInput>
          <Button
            className="d-block mx-auto col-5 mt-2"
            color="warning"
            onClick={accept}
          >
            باز کردن ویرایشگر
          </Button>
        </Fragment>
      )}
      <div className="d-flex mt-3 justify-content-between ">
        <Button
          className="btn-prev"
          color="primary"
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
        <Button
          type="submit"
          color="success"
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">
            ثبت تغییرات
          </span>
          <CheckCircle
            size={14}
            className="align-middle ms-sm-25 ms-0 "
            style={{ rotate: "180deg" }}
          ></CheckCircle>
        </Button>
      </div>
    </Fragment>
  );
};

export default ChangeDescribe;
