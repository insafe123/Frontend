import React, {useState} from 'react';


import UploadComponent from "./components/upload";
import VisualizeComponent from './components/visualize';

function App() {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (file) => {
    // Send the file to the backend and get the file name in response
    // Then update the fileName state variable
    setFileName('example.obj');
  };

  return (
    <div>
      <UploadComponent onFileUpload={handleFileUpload} />
      <VisualizeComponent modelUrl={`/models/${fileName}`} />
    </div>
  );
}

export default App;
