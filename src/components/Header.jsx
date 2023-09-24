import { Typography, Row, Col } from "antd";
import Logo from '../assets/logo_dho.png';
import BgHeader from '../assets/bg_image_header_2.jpg';
import '../App.css';

const { Title } = Typography;

const Header = () => {
    const styleHeader = { 
        position: 'absolute',
        top: '20px',
        left: '20px',
    };

    return (
        <div>
            <img width="100%" src={BgHeader} alt="" />           
            <div style={styleHeader}>
                <img width={220} src={Logo} alt="" />
                <Title className="fontMooli" level={3}>A ponte entre sonhos e realidade, talentos e oportunidades.</Title>
            </div>                
        </div>
    );
    }

export default Header;