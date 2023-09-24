import { Typography, Row, Col } from "antd";
import Logo from '../assets/logo_dho.png';
import BgHeader from '../assets/bg_image_header_2.jpg';
import '../App.css';

const { Title } = Typography;

const Header = () => {


    return (
        <div>
            <img width="100%" src={BgHeader} alt="" />           
            <div className="containerContentHeader">
                <img className="imageHeader" src={Logo} alt="" />
                <h2 className="fontMooli textHeader">A ponte entre sonhos e realidade, talentos e oportunidades.</h2>
            </div>                
        </div>
    );
    }

export default Header;