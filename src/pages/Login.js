// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import logo from "../assets/images/logo/logo.png";
// ** Styles
import "@styles/react/pages/page-authentication.scss";
import instance from "../utility/interceptor";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { removeItem, setItem } from "../utility/local-storage/storage.services";
import { getProfile } from "../utility/api/GetData/GetProfile";

const Login = () => {
  const { skin } = useSkin();
  const navigator = useNavigate();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const onSubmitLogin = async (value) => {
    console.log(value);
    try {
      const result = await instance.post("/Sign/Login", {
        phoneOrGmail: value.phoneOrGmail,
        password: value.password,
        rememberMe: value.rememberMe,
      });
      const userInfo = await getProfile();
      setItem("token", result.token);
      setItem("userData", userInfo);
      console.log(result);
      if (result.success) {
        navigator("/");
      } else {
        toast.error(result.errors == null ? result.message : result.errors[0]);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div className="auth-wrapper auth-cover IRANSans overf">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logo} style={{width:'200px'}} />
          {/* <h2 className="brand-text text-primary ms-1">Hexa Squad</h2> */}
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12" dir="rtl">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به پنل ادمین خوش آمدید! 👋
            </CardTitle>
            <CardText className="mb-2">
              لطفا برای دسترسی به پنل ادمین ورود کنید
            </CardText>
            <Formik
              className="auth-login-form mt-2"
              initialValues={{
                phoneOrGmail: "",
                password: "",
                rememberMe: false,
              }}
              enableReinitialize={true}
              onSubmit={(e) => {
                onSubmitLogin(e);
              }}
            >
              <Form>
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    ایمیل یا شماره تماس
                  </Label>
                  <Field
                    type="text"
                    id="login-email"
                    name="phoneOrGmail"
                    placeholder="you@example.com یا شماره تماس"
                    autoFocus
                    className="form-control"
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      رمز عبور
                    </Label>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    name={"password"}
                    id="login-password"
                  />
                </div>
                <div className="form-check mb-1">
                  <Input type="checkbox" name="rememberMe" id="remember-me" />
                  <Label className="form-check-label" for="remember-me">
                    مرا به یاد بیاور !
                  </Label>
                </div>
                <Button type="submit" color="primary" block>
                  ورود به پنل
                </Button>
              </Form>
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
