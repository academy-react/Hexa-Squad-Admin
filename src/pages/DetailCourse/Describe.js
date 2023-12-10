// ** Reactstrap Imports
import { Card, CardTitle, CardBody } from "reactstrap";
import EditorJsComponent from "../../@core/components/EditorJs";
const Describe = ({ describe }) => {
  console.log("describe", describe);
  // const describe = {
  //   time: 1702117159454,
  //   blocks: [
  //     {
  //       id: "abfxGolqM6",
  //       type: "paragraph",
  //       data: {
  //         text: "asccjnklsmclkc",
  //       },
  //     },
  //     {
  //       id: "ClJyMmsk7q",
  //       type: "paragraph",
  //       data: {
  //         text: "cslokl;cc,;lccslc,",
  //       },
  //     },
  //     {
  //       id: "5BQwHIGTRD",
  //       type: "heckList",
  //       data: {
  //         items: [
  //           {
  //             text: "scscc",
  //             checked: true,
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       id: "85e7RiNW9l",
  //       type: "warning",
  //       data: {
  //         title: "ssss",
  //         message: "ssssssss",
  //       },
  //     },
  //   ],
  //   version: "2.28.2",
  // };

  return (
    <Card className="min-h-70">
      <CardBody>
        <CardTitle className="mb-50" tag="h4">
          توضیحات دوره
        </CardTitle>
        <p className="mb-0">
          برای تغییر دادن توضیحات دوره روی بخش مورد نظر دوبار کلیک کنید
        </p>
        {typeof describe === "object" && describe !== null ? (
          <EditorJsComponent defaultData={describe} />
        ) : (
          <textarea className="form-control" defaultValue={describe}></textarea>
        )}
      </CardBody>
    </Card>
  );
};

export default Describe;
