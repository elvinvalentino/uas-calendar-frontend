import { useRef } from 'react';
import Navbar from './components/Navbar'
import Content from './components/Content'
import { GlobalStyles } from './themes/global';

const App = () => {
  const calendarRef = useRef()

  return (
    <>
      <GlobalStyles />
      <Navbar calendarRef={calendarRef} />
      <Content calendarRef={calendarRef} />
    </>
  );
}

export default App;
