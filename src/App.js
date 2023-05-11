import React, {useState} from 'react';


import UploadComponent from "./components/upload";


function App() {
  const [setFileName] = useState('');

  const handleFileUpload = (file) => {
    // Send the file to the backend and get the file name in response
    // Then update the fileName state variable
    setFileName('example.obj');
  };

  return (
    <div>
      <UploadComponent onFileUpload={handleFileUpload} />
    </div>
  );
}

export default App;
