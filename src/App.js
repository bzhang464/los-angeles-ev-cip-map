import logo from './logo.svg';
import './App.css';
import { Map } from './components/Map';
import { Table } from './components/Table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h3>
          Los Angeles EV Charger/CIP Location Data
        </h3>
        <p>City of Los Angeles</p>
        <Map/>
        <Table/>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Maps
        </a>
        <br></br>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Tables
        </a> */}
      </header>
    </div>
  );
}

export default App;
