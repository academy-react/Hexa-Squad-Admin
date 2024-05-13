// ** Reactstrap Imports
import { Card, CardTitle, CardBody } from "reactstrap";
import EditorJsComponent from "../../@core/components/EditorJs";
import { useEffect, useState } from "react";
const Describe = ({ describe }) => {
  const [Describe, setDescribe] = useState();
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
    <Card>
      <CardBody>
        <CardTitle className="mb-50" tag="h4">
          توضیحات دوره
        </CardTitle>
        {typeof Describe === "object" && Describe !== null ? (
          <EditorJsComponent dontShowBtn={true} defaultData={Describe} />
        ) : (
          <p>{Describe}</p>
        )}
      </CardBody>
    </Card>
  );
};

export default Describe;
