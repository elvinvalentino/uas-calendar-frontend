import Navbar from './components/Navbar'
import Content from './components/Content'
import { GlobalStyles } from './themes/global';

const App = () => {

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Content />
    </>
  );
}

export default App;
