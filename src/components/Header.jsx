import { Typography } from "antd";
import Logo from '../assets/logo.svg';

const { Title } = Typography;

const Header = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img width={120} src={Logo} alt="" />
        <Title level={3}>Painel de Vagas</Title>
        </div>
    );
    }

export default Header;