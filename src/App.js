import logo from './logo.svg';
import './App.css';
import RawMap from './RawMap';
import MeanMap from './MeanMap';
import MedianMap from './MedianMap';
import { useState } from 'react';

function App() {
  const [isRawVisible, setIsRawVisible] = useState(true);
  const [isMeanVisible, setIsMeanVisible] = useState(false);
  const [isMedianVisible, setIsMedianVisible] = useState(false);
  const [filterLag, setFilterLag] = useState(20);
   
  const handleMapSelection = (selectionNum) => {
    setIsRawVisible(false);
    setIsMeanVisible(false);
    setIsMedianVisible(false);

    if (selectionNum == 1) {
      setIsRawVisible(true);
    } else if (selectionNum == 2) {
      setIsMeanVisible(true);
    } else if (selectionNum == 3) {
      setIsMedianVisible(true);
    }
  }

  const handleFilterLagChange = (event) => {
    setFilterLag(event.target.value);
  }

  return (
    <div className="App">
      <RawMap isVisible={isRawVisible} />
      <MeanMap isVisible={isMeanVisible} filterLag={filterLag} />
      <MedianMap isVisible={isMedianVisible} filterLag={filterLag} />

      <div className='button-group'>
        <button disabled={isRawVisible} onClick={() => handleMapSelection(1)}>Raw</button>
        <button disabled={isMeanVisible} onClick={() => handleMapSelection(2)} >Mean</button>
        <button disabled={isMedianVisible} onClick={() => handleMapSelection(3)}>Median</button><br /><br />
        <label>Filter lag: {filterLag}</label><br />
        <input type={"range"} min={2} max={40} onChange={handleFilterLagChange} defaultValue={filterLag} />
      </div>
    </div>
  );
}

export default App;
