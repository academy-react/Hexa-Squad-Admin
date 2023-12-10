// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        <a href="/" target="_blank" rel="noopener noreferrer">
           Hexa Squad
        </a>
        <span className="d-none d-sm-inline-block">
          تمام حقوق این صفحه متعلق هست به :  
        </span>
        <span className=" me-2">COPYRIGHT © {new Date().getFullYear()} </span>
      </span>
      <span className="float-md-end d-none d-md-block">
        Hexa Squad
        <Heart size={14} />
      </span>
    </p>
  );
};

export default Footer;
