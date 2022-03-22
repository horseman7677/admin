import { makeStyles } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About'
import Labour from './components/Labour'
import Items from './components/Items'
import Navbar from './components/Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  }
}))

function App() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <Routes>
          <Route exact path='/' element={<Navbar />} />
          <Route path='/about' element={<About />} />
          <Route path='/labour' element={<Labour />} />
          <Route path='/items' element={<Items />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
