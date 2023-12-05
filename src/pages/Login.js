// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";

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

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import instance from "../utility/interceptor";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { removeItem, setItem } from "../utility/local-storage/storage.services";
import { getProfile } from "../utility/api/GetData/GetProfile/GetProfile";

const Login = () => {
  const { skin } = useSkin();

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
          window.location.pathname = "/";
      } else {
        toast.error(result.errors == null ? result.message : result.errors[0]);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div className="auth-wrapper auth-cover IRANSans">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
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
                    <Link to="/forgot-password">
                      <small>رمز عبور را فراموش کردید ؟</small>
                    </Link>
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
            <p className="text-center mt-2">
              <span className="me-25">کاربر جدید هستید ؟</span>
              <Link to="/register">
                <span> ساخت اکانت جدید</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
