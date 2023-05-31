// import { useState, useRef, useEffect } from 'react';
// import '@kitware/vtk.js/Rendering/Profiles/Geometry';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
// import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
// import vtkXMLPolyDataWriter from '@kitware/vtk.js/IO/XML/XMLPolyDataWriter';
// import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
// import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';
// import axios from 'axios';
//
// function VTKViewer() {
//   const [file, setFile] = useState(null);
//   const vtkContainerRef = useRef(null);
//   const context = useRef(null);
//
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
//
//   const handlePredictModel = async () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//
//       const baseUrl = 'http://localhost:8000';
//       const response = await axios.post(`${baseUrl}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//
//       // Retrieve the VTP file URL from the response
//       const vtpFileUrl = response.data.downsampling_refined;
//
//       // Fetch the VTP file data
//       const vtpFileResponse = await axios.get(`${baseUrl}/vtp-file`, {
//         responseType: 'blob',
//       });
//
//       // Create a File object from the VTP file data
//       const vtpFileData = new File([vtpFileResponse.data], 'output.vtp');
//
//       setFile(vtpFileData);
//     } catch (error) {
//       console.error('Error predicting model:', error);
//     }
//   };
//
//   useEffect(() => {
//     let vtpReader;
//     if (!context.current) {
//       const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//         rootContainer: vtkContainerRef.current,
//       });
//       const renderer = fullScreenRenderer.getRenderer();
//       const renderWindow = fullScreenRenderer.getRenderWindow();
//
//       context.current = {
//         fullScreenRenderer,
//         renderWindow,
//         renderer,
//       };
//     }
//
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         vtpReader = vtkXMLPolyDataReader.newInstance();
//         vtpReader.parseAsArrayBuffer(reader.result);
//
//         const polyData = vtpReader.getOutputData(0);
//         const { renderer, renderWindow } = context.current;
//
//         const mapper = vtkMapper.newInstance();
//         mapper.setInputData(polyData);
//
//         const actor = vtkActor.newInstance();
//         actor.setMapper(mapper);
//
//         renderer.addActor(actor);
//         renderer.resetCamera();
//         renderWindow.render();
//
//         context.current = {
//           ...context.current,
//           vtpReader,
//           polyData,
//           mapper,
//           actor,
//         };
//       };
//       reader.readAsArrayBuffer(file);
//     }
//
//     return () => {
//       if (context.current) {
//         const { vtpReader, polyData, mapper, actor } = context.current;
//         if (vtpReader) vtpReader.delete();
//         if (polyData) polyData.delete();
//         if (mapper) mapper.delete();
//         if (actor) actor.delete();
//       }
//     };
//   }, [vtkContainerRef, file]);
//
//   return (
//     <div>
//       <div ref={vtkContainerRef} />
//       <table
//         style={{
//           position: 'absolute',
//           top: '25px',
//           left: '25px',
//           background: 'white',
//           padding: '12px',
//         }}
//       >
//         <tbody>
//           <tr>
//             <td>
//               <input type="file" accept=".vtp" onChange={handleFileChange} />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button type="button" onClick={handlePredictModel}>
//                 Predict Model
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default VTKViewer;


//////////////////////////////2/////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import '@kitware/vtk.js/Rendering/Profiles/Geometry';
// import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
// import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
// import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
// import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
// import vtkXMLPolyDataWriter from '@kitware/vtk.js/IO/XML/XMLPolyDataWriter';
// import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
// import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';
// import axios from 'axios';
//
// function VTKViewer() {
//   const [file, setFile] = useState(null);
//   const vtkContainerRef = useRef(null);
//   const context = useRef(null);
//
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
//
//   const handlePredictModel = async () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//
//       const baseUrl = 'http://localhost:8000';
//       const response = await axios.post(`${baseUrl}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//
//       // Retrieve the VTP file URL from the response
//       const vtpFileUrl = response.data.downsampling_refined;
//
//       // Fetch the VTP file data
//       const vtpFileResponse = await axios.get(`${baseUrl}/vtp-file`, {
//         responseType: 'blob',
//       });
//
//       // Create a File object from the VTP file data
//       const vtpFileData = new File([vtpFileResponse.data], 'output.vtp');
//
//       setFile(vtpFileData);
//     } catch (error) {
//       console.error('Error predicting model:', error);
//     }
//   };
//
//   const handleVisualize = () => {
//     if (!file) {
//       console.error('No VTP file selected');
//       return;
//     }
//
//     const baseUrl = 'http://localhost:8000';
//     window.open(`${baseUrl}/vtp-file`);
//   };
//
//   useEffect(() => {
//     let vtpReader;
//     if (!context.current) {
//       const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
//         rootContainer: vtkContainerRef.current,
//       });
//       const renderer = fullScreenRenderer.getRenderer();
//       const renderWindow = fullScreenRenderer.getRenderWindow();
//
//       context.current = {
//         fullScreenRenderer,
//         renderWindow,
//         renderer,
//       };
//     }
//
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         vtpReader = vtkXMLPolyDataReader.newInstance();
//         vtpReader.parseAsArrayBuffer(reader.result);
//
//         const polyData = vtpReader.getOutputData(0);
//         const { renderer, renderWindow } = context.current;
//
//         const mapper = vtkMapper.newInstance();
//         mapper.setInputData(polyData);
//
//         const actor = vtkActor.newInstance();
//         actor.setMapper(mapper);
//
//         renderer.addActor(actor);
//         renderer.resetCamera();
//         renderWindow.render();
//
//         context.current = {
//           ...context.current,
//           vtpReader,
//           polyData,
//           mapper,
//           actor,
//         };
//       };
//       reader.readAsArrayBuffer(file);
//     }
//
//     return () => {
//       if (context.current) {
//         const { vtpReader, polyData, mapper, actor } = context.current;
//         if (vtpReader) vtpReader.delete();
//         if (polyData) polyData.delete();
//         if (mapper) mapper.delete();
//         if (actor) actor.delete();
//       }
//     };
//   }, [vtkContainerRef, file]);
//
//   return (
//     <div>
//       <div ref={vtkContainerRef} />
//       <table
//         style={{
//           position: 'absolute',
//           top: '25px',
//           left: '25px',
//           background: 'white',
//           padding: '12px',
//         }}
//       >
//         <tbody>
//           <tr>
//             <td>
//               <input type="file" accept=".vtp" onChange={handleFileChange} />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button type="button" onClick={handlePredictModel}>
//                 Predict Model
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <button type="button" onClick={handleVisualize}>
//                 Download
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default VTKViewer;
// //
import React, { useState, useRef, useEffect } from 'react';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
import axios from 'axios';

function VTKViewer() {
  const [file, setFile] = useState(null);
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  const [vtpFileUrl, setVtpFileUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePredictModel = async () => {
    if (!file) {
      console.error('No VTP file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const baseUrl = 'http://localhost:8000';
      const response = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Retrieve the VTP file URL from the response
      const vtpFileUrl = `http://${response.data.downsampling_refined}`;
      setVtpFileUrl(vtpFileUrl);
      console.log(response.data.downsampling_refined);


      // Optionally, you can download the VTP file here using axios
      // and save it locally if needed.
    } catch (error) {
      console.error('Error predicting model:', error);
    }
  };

  const handleVisualize = async () => {
    if (vtpFileUrl) {
      const { renderer, renderWindow } = context.current;

      try {
        // Fetch the VTP file data
        const vtpFileResponse = await axios.get(vtpFileUrl, {
          responseType: 'blob',
        });

        // Create a File object from the VTP file data
        const vtpFileData = new File([vtpFileResponse.data], 'output.vtp');

        // Read the VTP file using vtkXMLPolyDataReader
        const reader = vtkXMLPolyDataReader.newInstance();
        reader.parseAsArrayBuffer(vtpFileData);

        const polyData = reader.getOutputData();
        const mapper = vtkMapper.newInstance();
        mapper.setInputData(polyData);

        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);

        renderer.removeAllActors();
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();

        context.current = {
          ...context.current,
          reader,
          polyData,
          mapper,
          actor,
        };
      } catch (error) {
        console.error('Error loading VTP file:', error);
      }
    }
  };

  useEffect(() => {
    if (!context.current) {
      const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
        rootContainer: vtkContainerRef.current,
      });
      const renderer = fullScreenRenderer.getRenderer();
      const renderWindow = fullScreenRenderer.getRenderWindow();

      context.current = {
        fullScreenRenderer,
        renderWindow,
        renderer,
      };
    }

    return () => {
      if (context.current) {
        const { reader, polyData, mapper, actor } = context.current;
        if (reader) reader.delete();
        if (polyData) polyData.delete();
        if (mapper) mapper.delete();
        if (actor) actor.delete();
      }
    };
  }, []);

  return (
    <div>
      <div ref={vtkContainerRef} />
      <table
        style={{
          position: 'absolute',
          top: '25px',
          left: '25px',
          background: 'white',
          padding: '12px',
        }}
      >
        <tbody>
          <tr>
            <td>
              <input type="file" accept=".vtp" onChange={handleFileChange} />
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={handlePredictModel}>
                Predict Model
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={handleVisualize}>
                Visualize
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default VTKViewer;
