import { Typography, Row, Col } from "antd";
import Logo from '../assets/logo_dho.png';
import BgHeader from '../assets/bg_image_header_2.jpg';

const { Title } = Typography;

const Header = () => {
    const styleHeader = { 
        display: 'flex', 
        alignItems: 'center',
        backgroundImage: `url(${BgHeader})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '700px' 
    };

    return (
        <div style={styleHeader}
            >
                 <Row align="middle" justify="start" style={{ height: '100%' }}>
                <Col xs={{ offset: 1, span: 23 }} sm={{ offset: 2 }} md={{ offset: 3 }} lg={{ offset: 10 }}>
                    <div>
                        <img width={220} src={Logo} alt="" />
                        <Title level={3}>A ponte entre sonhos e realidade, talentos e oportunidades.</Title>
                    </div>
                </Col>
            </Row>
                
            
            
        </div>
    );
    }

export default Header;