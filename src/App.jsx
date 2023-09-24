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
    <>
      <div style={headerStyle}>
        <HeaderTop />
      </div>
      <div style={contentStyle}>
        <Cards />
      </div>
      <div style={footerStyle}>
        <FooterBottom />
      </div>
    </>
  );
}

export default App;