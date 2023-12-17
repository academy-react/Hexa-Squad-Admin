import { Button, Card, CardHeader, Label } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import CreatableSelect from "react-select/creatable";
import toast from "react-hot-toast";
import instance from "../../../../utility/interceptor";

const AddTech = ({ TechOptions, stepper, courseId }) => {
  const [techNameId, setTechNameId] = useState();
  const [techId, setTechId] = useState();
  const onSubmit = async () => {
    try {
      const result = await instance.post(
        "/Course/AddCourseTechnology?courseId=" + courseId,
        techId
      );
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          // window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let techName = [];
    techNameId &&
      techNameId.map((item) => {
        techName = [...techName, { techId: item.value }];
        setTechId([...techName]);
      });
  }, [techNameId]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "300px" }}
    >
      <div className="col-8  mx-auto block ">
        <CardHeader className="mt-2  mb-4">
          <h2>تکنولوژی های دوره را وارد کنید</h2>
        </CardHeader>
        {/* <EditorJsComponent setDescribe={setDescribe} /> */}

        <Label className="form-label m-0"> تکنولوژی ها</Label>
        <CreatableSelect
          options={TechOptions}
          isMulti
          placeholder="لطفا انتخاب کنید"
          className="react-select z-3 position-relative"
          classNamePrefix="select"
          onChange={(e) => {
            setTechNameId(e);
          }}
        />
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

export default AddTech;
