// ** React Imports
import { useState, useEffect } from 'react'

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
  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `

  const contentBlock = htmlToDraft(initialContent)
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorState = EditorState.createWithContent(contentState)

  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(''),
    [slug, setSlug] = useState(''),
    [status, setStatus] = useState(''),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState('banner.jpg')
    const NewsParams = useParams()

  // useEffect(() => {
  //   axios.get('/blog/list/data/edit').then(res => {
  //     setData(res.data)
  //     setTitle(res.data.blogTitle)
  //     setSlug(res.data.slug)
  //     setBlogCategories(res.data.blogCategories)
  //     setFeaturedImg(res.data.featuredImage)
  //     setStatus(res.data.status)
  //   })
  // }, [])
//   const fetchNewsData= async() => {
   
//     try {
//       const News = await instance.get('/News/'+ NewsParams.id);
//       setData(News.detailsNewsDto);
      
//       // setTitle(res.detailsNewsDto.title)
//       // setSlug(res.detailsNewsDto.miniDescribe)
//       // setBlogCategories(res.detailsNewsDto.newsCatregoryName)
//       // setFeaturedImg(res.detailsNewsDto.currentImageAddress)
//       // setStatus(res.detailsNewsDto.insertDate)
//       console.log(News)
//     } catch (error) {
//       console.log(error);
//     }
//   }
// useEffect(() => {
// fetchNewsData()
// }, [])

  const addNews = async (value) => {
    try {
      let formData = new FormData();
      formData.append("Title", value.Title);
      formData.append("GoogleTitle", value.GoogleTitle);
      formData.append("GoogleTitle", value.GoogleDescribe);
      formData.append("MiniDescribe", value.MiniDescribe);
      formData.append("Describe", value.Describe);
      formData.append("Keyword", value.Keyword);
      formData.append("NewsCatregoryId", value.NewsCatregoryId);
      formData.append("Image", value.Image);
      const response = await instance.post("/News/CreateNews", formData);
      if (response.success) {
        toast.success(" بلاگ شما ثبت شد");
      } else {
        toast.error(" لطفا متن بلاگ را به درستی وارد کنید");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handle = async (value) => {
    addNews(value);

  };
  const categories = [
    { value: 'خبرهای اقتصادی', label: 'خبرهای اقتصادی' },
    { value: 'مقالات', label: 'مقالات' },
    { value: 'خبر های ورزشی', label: 'خبر های ورزشی' },
    { value: 'رویداد ها', label: 'رویداد ها'},
  
  ]

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    setImgPath(files[0].name)
    reader.onload = function () {
      setFeaturedImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  return (
    <div className='blog-edit-wrapper'>
      <Breadcrumbs title='Blog Edit' data={[{ title: 'Pages' }, { title: 'Blog' }, { title: 'Edit' }]} />
     
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
                      <Label className='form-label' for='Title'>
                        عنوان
                      </Label>
                      <Input id="Title" name="Title" placeholder=" عنوان را وارد کنید"/>
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='NewsCatregoryId'>
                        دسته بندی
                      </Label>
                      <Select
                        id='NewsCatregoryId'
                        isClearable={false}
                        theme={selectThemeColors} 
                        isMulti
                        name='NewsCatregoryId'
                        options={categories}
                        className='react-select'
                        classNamePrefix='select'
                       
                      />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='MiniDescribe'>
                        توضیح کوتاه
                      </Label>
                      <Input id='MiniDescribe'  name='MiniDescribe'  placeholder="  توضیح کوتاه را وارد کنید"  />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='Keyword'>
                         کلمات کلیدی
                      </Label>
                      <Input id='Keyword' name='Keyword' placeholder= "کلمات کلیدی را وارد کنید"/>
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='GoogleTitle'>
                      GoogleTitle
                      </Label>
                      <Input
                        id='GoogleTitle'
                        name='GoogleTitle'
                       
                      >
                        {/* <option value='Published'>Published</option>
                        <option value='Pending'>Pending</option>
                        <option value='Draft'>Draft</option> */}
                      </Input>
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='GoogleDescribe'>
                      GoogleDescribe
                      </Label>
                      <Input
                        
                        id='GoogleDescribe'
                        name='GoogleDescribe'
                        
                      >
                        {/* <option value='Published'>Published</option>
                        <option value='Pending'>Pending</option>
                        <option value='Draft'>Draft</option> */}
                      </Input>
                    </Col>
                    <Col  className='mb-2'>
                      <Label className='' for='GoogleDescribe'>
                      متن بلاگ
                      </Label>
                      <Input
                        type='textarea'
                        id='GoogleDescribe'
                        name='GoogleDescribe'
                      >
                      </Input>
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

                            <p className='my-50'>
                              <a href='/'>
                                {/* {`C:/fakepath/${imgPath}`} */}
                              </a>
                            </p>
                            <div className='d-inline-block'>
                              <div className='mb-0'>
                                <Input
                                  type='file'
                                  id='Image'
                                  name='Image'
                                  onChange={onChange}
                                  accept='.jpg, .png, .gif'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className='mt-50'>
                      <Button color='primary' className='me-1' onClick={handle} >
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
        </Row>
    
    </div>
  )
}

export default BlogEdit
