import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

// components
import Cards from './components/Cards';
import HeaderTop from './components/Header';
import FooterBottom from './components/Footer';

const headerStyle = {
  height: 'fit-content',
  backgroundColor: '#fff',
};
const contentStyle = {
  backgroundColor: '#fff',
};
const footerStyle = {

};

const App = () => {
 
  return (
    <Layout>
      <Header style={headerStyle}>
        <HeaderTop />
      </Header>
      <Content style={contentStyle}>
        <Cards />
      </Content>
      <Footer style={footerStyle}>
        <FooterBottom />
      </Footer>
    </Layout>
  );
}

export default App;