// ** React Imports
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import instance from "../../utility/interceptor/index";
// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import * as Icon from "react-feather";
import { GitHub, Calendar, Inbox, Camera, Award, Star } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";
import icon from "../../assets/images/icons/book.svg";
import GregorianToSolar from "../../utility/GregorianToSolar/GregorianToSolar";
// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from "reactstrap";

const BlogSidebar = () => {
  // ** States
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState([]);
  // useEffect(() => {
  //   axios.get('/blog/list/data/sidebar').then(res => setData(res.data))
  // }, [])

  const NewsParams = {
    Query: searchValue,
  };
  const getNewsList = async () => {
    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: NewsParams,
      });
      const result = News.news;
      setData(result.slice(4, 9));
    } catch (error) {
      console.log(error);
    }
  };
  const getNewsCategories = async () => {
    try {
      const category = await instance.get("/News/GetListNewsCategory");
      setCategory(category.slice(0, 5));
      console.log(category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewsCategories();
    getNewsList();
  }, [searchValue]);

  const CategoryColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };
  const [newsList, setNewsList] = useState([]);
  const handleSearch = async (query) => {
    const Params = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: query,
    };

    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: Params,
      });
      setNewsList(News.news);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (e) => {
    const value = e.target.value;
    clearTimeout(searchRef.current);
    const timeOut = setTimeout(() => {
      if (value !== "") {
        setSearchValue(value);
      } else {
        setSearchValue(null);
      }
    }, 1000);
    searchRef.current = timeOut;
  };

  const renderRecentPosts = () => {
    return data.map((post, index) => {
      return (
        <div
          key={index}
          className={classnames("d-flex shadow-sm", {
            "mb-2": index !== data.length - 1,
          })}
        >
          {/* <Link className='me-2' to={`/pages/blog/detail/${post.id}`}> */}
          <img
            className="rounded w-25 h-25 pe-2"
            src={
              data.currentImageAddressTumb == null
                ? icon
                : data.currentImageAddressTumb
            }
            alt={post.title}
            width="100"
            height="70"
          />
          {/* </Link> */}
          <div>
            <h6 className="blog-recent-post-title ">
              <Link
                className="text-body-heading "
                to={`/NewsDetails/${post.id}`}
              >
                {post.title}
              </Link>
            </h6>
            <div className="text-muted mb-0">
              {GregorianToSolar(post.insertDate)}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCategories = () => {
    return category.map((item, index) => {
      // const IconTag = Icon[item.icon]

      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mb-75": index !== data.length,
            }
          )}
        >
          <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
            {/* <Avatar className="rounded bg-primary opacity-75"></Avatar> */}
            <Avatar color="light-primary" icon={<Star size={14} />} />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            <div className="blog-category-title text-body">
              {item.categoryName}
            </div>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {/* <div className="blog-search"> */}
            {/* <InputGroup className="input-group-merge">
                <Input placeholder="جستجو" />
                <InputGroupText onChange={handleFilter}>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup> */}
            {/* </div> */}
            {data !== null ? (
              <Fragment>
                <div className="blog-recent-posts ">
                  <h6 className="section-label">اخرین اخبار</h6>
                  <div className="mt-75">{renderRecentPosts()}</div>
                </div>
                <div className="blog-categories mt-3">
                  <h6 className="section-label">دسته بندی ها</h6>
                  <div className="mt-1">{renderCategories()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
