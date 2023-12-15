// ** Reactstrap Imports
import { Card, CardTitle, CardBody, Table, Input, Button } from "reactstrap";

const typesArr = [
  {
    title: "New for you",
    defaultChecked: ["email"],
  },
  {
    title: "Account activity",
    defaultChecked: ["browser", "app"],
  },
  {
    title: "A new browser used to sign in",
    defaultChecked: ["email", "browser", "app"],
  },
  {
    title: "A new device is linked",
    defaultChecked: ["browser"],
  },
];
import "../../@core/scss/react/apps/app-course-detail.scss";

const Settings = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-50" tag="h4">
          تنظیمات دوره
        </CardTitle>
      </CardBody>
      <Table className="text-nowrap text-center border-bottom" responsive>
        <thead>
          <tr>
            <th className="text-start">Type</th>
            <th>✉️ Email</th>
          </tr>
        </thead>
        <tbody>
          {typesArr.map((type, index) => {
            return (
              <tr key={index}>
                <td className="text-start">{type.title}</td>
                <td>
                  <div className="d-flex form-check justify-content-center">
                    <Input
                      type="checkbox"
                      defaultChecked={type.defaultChecked.includes("email")}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CardBody>
        <Button className="me-1" color="primary">
          Save Changes
        </Button>
        <Button outline>Discard</Button>
      </CardBody>
    </Card>
  );
};

export default Settings;
