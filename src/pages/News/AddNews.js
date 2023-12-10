// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { Formik } from "formik";
import FormikInput from "../../@core/components/FormikInput";
// ** Third Party Components
import axios from 'axios'
import Select from 'react-select'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js'
import { useParams } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'
import toast from "react-hot-toast";
// ** Utils
import { selectThemeColors } from '@utils'
import instance from '../../utility/interceptor'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import pic from "../../assets/images/icons/News.jpg"


const BlogEdit = () => {
  const [title, setTitle] = useState()
  const [describe, setDescribe] = useState()
  const [miniDescribe, setMiniDescribe] = useState()
  const [keyword, setKeyword] = useState()
  const [newsCatregoryId, setNewsCatregoryId] = useState()
  const [googleTitle, setGoogleTitle] = useState()
  const [googleDescribe, setGoogleDescribe] = useState()
  const [image, setImage] = useState()
  const [currentImageAddress, setCurrentImageAddress] = useState()
  
  const urlParam = useParams();
  const [newsInfo, setNewsInfo] = useState([]);



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
      Image: image,
      
    };
    try {
      
      const response = await instance.post("/News/CreateNews", obj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response)
      if (response.success) {
        toast.success(" بلاگ شما ثبت شد");
      } else {
        toast.error(" لطفا متن بلاگ را به درستی وارد کنید");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  // const categories = [
  //   { value: 'خبرهای اقتصادی', label: 'خبرهای اقتصادی' },
  //   { value: 'مقالات', label: 'مقالات' },
  //   { value: 'خبر های ورزشی', label: 'خبر های ورزشی' },
  //   { value: 'رویداد ها', label: 'رویداد ها'},
  
  // ]

  // const onChange = e => {
  //   const reader = new FileReader(),
  //     files = e.target.files
  //   setImgPath(files[0].name)
  //   reader.onload = function () {
  //     setFeaturedImg(reader.result)
  //   }
  //   reader.readAsDataURL(files[0])
  // }

  const postNewsInfo = (values) => {
    setTitle(values.Title);
    setDescribe(values.Describe);
    setMiniDescribe(values.MiniDescribe);
    setKeyword(values.Keyword);
    setNewsCatregoryId(values.NewsCatregoryId);
    setGoogleTitle(values.GoogleTitle);
    setGoogleDescribe(values.GoogleDescribe);
    setCurrentImageAddress(values.CurrentImageAddress);
    setImage(values.Image);
    
  };

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs
        title={" ایجاد خبر جدید"}
        data={[
          { title: "لیست اخبار", link: "/NewsList" },
          { title: "ویرایش اطلاعات اخبار", link: "/AddNews"}
        ]}
      />
        
     
      <Formik
        initialValues={{
          title:title,
          describe: describe,
          keyword: keyword,
          miniDescribe:miniDescribe,
          newsCatregoryId:newsCatregoryId,
          googleTitle: googleTitle,
          googleDescribe: googleDescribe,
          currentImageAddress: currentImageAddress,
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
          setCurrentImageAddress(form.values.currentImageAddress);

return (
      <Fragment>
          <Row>
            <Col sm='12'>
          <Card>
            <CardBody>
            <div className='d-flex'>
        {/* <div>
          <Avatar className='me-75'  imgWidth='38' imgHeight='38' />
        </div> */}
        <div>
          {/* <h6 className='mb-25'>{data.userFullName}</h6>
          <CardText>{data.createdTime}</CardText> */}
        </div>
      </div>
      <Form className='mt-2'>
        <Row>
          <Col md='6' className='mb-2'>
            <Label className='form-label' for='title'>
              عنوان
            </Label>
            <FormikInput
                name={"title"}
                placeholder={" عنوان را وارد کنید"}
                type={"text"}
               />
          </Col>
          <Col md='6' className='mb-2'>
            <Label className='form-label' for='newsCatregoryId'>
              دسته بندی
            </Label>
            <FormikInput
                type={"number"}
                name={"newsCatregoryId"}
                placeholder={" عدد دسته بندی"}
                />
            {/* <Select
              id='NewsCatregoryId'
              isClearable={false}
              theme={selectThemeColors} 
              isMulti
              name='NewsCatregoryId'
              options={categories}
              className='react-select'
              classNamePrefix='select'
             
            /> */}
              
          </Col>
          <Col md='6' className='mb-2'>
          <Label className='form-label' for='miniDescribe'>
           توضیح کوتاه
            </Label>
            <FormikInput
              name={"miniDescribe"}
              placeholder={"  توضیح کوتاه را وارد کنید"}
              type={"text"}
              />          
            </Col>
          <Col md='6' className='mb-2'>
            <Label className='form-label' for='keyword'>
               کلمات کلیدی
            </Label>
            <FormikInput
              name={"keyword"}
              placeholder={" کلمات کلیدی را وارد کنید"}
              type={"text"}
              />          
          </Col>
          <Col md='6' className='mb-2'>
            <Label className='form-label' for='googleTitle'>
            GoogleTitle
            </Label>
            <FormikInput
                  name={"googleTitle"}
                  placeholder={" googleTitle را وارد کنید"}
                  type={"text"}
                />
          </Col>
          <Col md='6' className='mb-2'>
            <Label className='form-label' for='googleDescribe'>
            GoogleDescribe
            </Label>
            <FormikInput
                  name={"googleDescribe"}
                  placeholder={"GoogleDescribe را وارد کنید"}
                  type={"text"}
                />
          </Col>
          <Col  className='mb-2'>
            <Label className='' for='GoogleDescribe'>
            متن بلاگ
            </Label>
              <FormikInput
                  name={"describe"}
                  placeholder={" توضیحات را وارد کنید"}
                  rows="12"
                  as={"textarea"}
                 
                />
          </Col>
          {/* <Col sm='12' className='mb-2'>
            <Label className='form-label'>Content</Label>
            <Editor editorState={content} onEditorStateChange={data => setContent(data)} />
          </Col> */}
          
          <Col className='mb-2' sm='12'>
            <div className='border rounded p-2'>
              <h4 className='mb-1'>تصویر بلاگ</h4>
              <div className='d-flex flex-column flex-md-row'>
                <img
                  className='rounded me-2 mb-1 mb-md-0'
                  src={pic}
                  alt='featured img'
                  width='170'
                  height='110'
                />
                <div>
                  <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>
                  <div className='d-inline-block'>
                    <div className='mb-0'>
                      <Input
                        type='file'
                        name={"currentImageAddress"}
                        // onChange={onChange}
                        id={'currentImageAddress'}
                      />
                        {/* <FormikInput
                          name={"currentImageAddress"}
                          
                          type={"file"}
                          // addClass={"col-md-4"}
                          // onChange={onChange}
                          
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className='mt-50'>
            <Button color='primary' className='me-1' onClick={addNews}>
              ثبت تغییرات

            </Button>
            <Button color='secondary' outline>
              لغو
            </Button>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
</Col>
</Row></Fragment>

          );
        }}
        {/* </Form> */}
      </Formik>
    
    </div>
  )
}

export default BlogEdit


{/* <CardBody className="cursor-pointer">
<Row className="my-1">
  <FormikInput
    name={"title"}
    placeholder={" عنوان را وارد کنید"}
    label={"عنوان:"}
    addClass={"col-md-4"}
    type={"text"}
  />
  <FormikInput
    name={"miniDescribe"}
    placeholder={"  توضیح کوتاه را وارد کنید"}
    label={" توضیح کوتاه:"}
    addClass={"col-md-4"}
    type={"text"}
  />
  <FormikInput
      name={"keyword"}
      placeholder={" کلمات کلیدی را وارد کنید"}
      type={"text"}
      label={"کلمات کلیدی:"}
      addClass={"col-md-4"}
  />
</Row>
<Row>
  <FormikInput
    name={"describe"}
    placeholder={" توضیحات را وارد کنید"}
    label={" توضیحات:"}
    addClass={"col-lg-10"}
    rows="10"
    as={"textarea"}
   
  />
  <FormikInput
    type={"number"}
    name={"newsCatregoryId"}
    placeholder={" عدد دسته بندی"}
    label={"دسته بندی:"}
    addClass={"col-sm-2"}
  />
</Row>
</CardBody> */}