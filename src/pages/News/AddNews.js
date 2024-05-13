// ** React Imports
import { useState, useEffect, Fragment } from "react";
import { Formik } from "formik";
import FormikInput from "../../@core/components/FormikInput";
// ** Third Party Components
import { useParams } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";
import FileUploaderSingle from "../../@core/components/FileUploaderSingle";
import Breadcrumbs from "@components/breadcrumbs";
import toast from "react-hot-toast";
// ** Utils
import instance from "../../utility/interceptor";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import pic from "../../assets/images/icons/News.jpg";
import { parse } from "@babel/core";

const BlogEdit = () => {
  const [title, setTitle] = useState();
  const [describe, setDescribe] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [keyword, setKeyword] = useState();
  const [newsCatregoryId, setNewsCatregoryId] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleDescribe, setGoogleDescribe] = useState();
  const [image, setImage] = useState();
  const [newsList, setNewsList] = useState([]);
  // const [currentImageAddress, setCurrentImageAddress] = useState()

  const urlParam = useParams();
  const [newsInfo, setNewsInfo] = useState([]);
  const [files, setFiles] = useState([]);

  const getList = async () => {
    try {
      const News = await instance.get("/News/GetListNewsCategory");
      setNewsList(News);
      console.log(News);
    } catch (error) {
      console.log(error);
    }
  };
  const addNews = async () => {
    const obj = {
      // id: urlParam.id,
      Title: title,
      Describe: describe,
      MiniDescribe: miniDescribe,
      Keyword: keyword,
      NewsCatregoryId: newsCatregoryId,
      GoogleTitle: googleTitle,
      GoogleDescribe: googleDescribe,
      Image: files[0],
    };
    try {
      const response = await toast.promise(
        instance.post("/News/CreateNews", obj, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        { loading: "در حال ایجاد خبر" }
      );
      console.log(response);
      if (response.success) {
        toast.success(" بلاگ شما ثبت شد");
      } else {
        toast.error(response.errors[0]);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const postNewsInfo = (values) => {
    setTitle(values.Title);
    setDescribe(values.Describe);
    setMiniDescribe(values.MiniDescribe);
    setKeyword(values.Keyword);
    setNewsCatregoryId(values.NewsCatregoryId);
    setGoogleTitle(values.GoogleTitle);
    setGoogleDescribe(values.GoogleDescribe);
    // setCurrentImageAddress(values.CurrentImageAddress);
    setImage(values.Image);
  };
  // console.log("imageeeee=", image);

  // const onSubmit = (e) => {
  //   const files = e.target.files;
  //   setImage(files);
  //   console.log("imageeeee=", files);
  // };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title={" ایجاد خبر جدید"}
        data={[
          { title: "لیست اخبار", link: "/NewsList" },
          { title: "ایجاد خبر جدید", link: "/AddNews" },
        ]}
      />

      <Formik
        initialValues={{
          title: title,
          describe: describe,
          keyword: keyword,
          miniDescribe: miniDescribe,
          newsCatregoryId: newsCatregoryId,
          googleTitle: googleTitle,
          googleDescribe: googleDescribe,
          image: "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          postNewsInfo(values);
        }}
      >
        {(form) => {
          setTitle(form.values.title);
          setDescribe(form.values.describe);
          setMiniDescribe(form.values.miniDescribe);
          setKeyword(form.values.keyword);
          setNewsCatregoryId(form.values.newsCatregoryId);
          setGoogleTitle(form.values.googleTitle);
          setGoogleDescribe(form.values.googleDescribe);
          setImage(form.values.image);

          return (
            <Fragment>
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        {/* <div>
          <Avatar className='me-75'  imgWidth='38' imgHeight='38' />
        </div> */}
                        <div>
                          {/* <h6 className='mb-25'>{data.userFullName}</h6>
          <CardText>{data.createdTime}</CardText> */}
                        </div>
                      </div>
                      <Form className="mt-2">
                        <Row>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="title">
                              عنوان
                            </Label>
                            <FormikInput
                              name={"title"}
                              placeholder={" عنوان را وارد کنید"}
                              type={"text"}
                            />
                          </Col>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="newsCatregoryId">
                              دسته بندی
                            </Label>
                            <select
                              name="newsCatregoryId"
                              onChange={(e) => {
                                setNewsCatregoryId(parseInt(e.target.value));
                                console.log(parseInt(e.target.value));
                              }}
                              className="col-12 form-control mt-1"
                            >
                              {newsList.map((item, i) => (
                                <option value={item.id} key={i}>
                                  {item.categoryName}
                                </option>
                              ))}
                            </select>
                          </Col>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="miniDescribe">
                              توضیح کوتاه
                            </Label>
                            <FormikInput
                              name={"miniDescribe"}
                              placeholder={"  توضیح کوتاه را وارد کنید"}
                              type={"text"}
                            />
                          </Col>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="keyword">
                              کلمات کلیدی
                            </Label>
                            <FormikInput
                              name={"keyword"}
                              placeholder={" کلمات کلیدی را وارد کنید"}
                              type={"text"}
                            />
                          </Col>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="googleTitle">
                              GoogleTitle
                            </Label>
                            <FormikInput
                              name={"googleTitle"}
                              placeholder={" googleTitle را وارد کنید"}
                              type={"text"}
                            />
                          </Col>
                          <Col md="6" className="mb-2">
                            <Label className="form-label" for="googleDescribe">
                              GoogleDescribe
                            </Label>
                            <FormikInput
                              name={"googleDescribe"}
                              placeholder={"GoogleDescribe را وارد کنید"}
                              type={"text"}
                            />
                          </Col>
                          <Col className="mb-2">
                            <Label className="" for="GoogleDescribe">
                              متن بلاگ
                            </Label>
                            <FormikInput
                              name={"describe"}
                              placeholder={" توضیحات را وارد کنید"}
                              rows="12"
                              as={"textarea"}
                            />
                          </Col>

                          <Col className="mb-2" sm="12">
                            <div className="border rounded p-2 cursor-pointer">
                              <h4 className="mb-1 ">تصویر بلاگ</h4>
                              {/* <div className="d-flex flex-column flex-md-row"> */}
                              <small className="text-muted"></small>

                              {/* <Input
                                        type="file"
                                        name={"image"}
                                        onChange={onSubmit}
                                        // id={'currentImageAddress'}
                                      /> */}
                              <FileUploaderSingle
                                name={"Image"}
                                files={files}
                                Title={"عکس خبر"}
                                setFiles={setFiles}
                              />
                            </div>
                          </Col>
                          <Col className="mt-50">
                            <Button
                              color="primary"
                              className="me-1"
                              onClick={addNews}
                            >
                              ثبت تغییرات
                            </Button>
                            <Button color="secondary" outline>
                              لغو
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Fragment>
          );
        }}
        {/* </Form> */}
      </Formik>
    </div>
  );
};

export default BlogEdit;
