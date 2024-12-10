import React, { useState } from "react";
import DetectionForm from "./components/DetectionForm";
import DetectionTable from "./components/DetectionTable";

const App = () => {
  const [detections, setDetections] = useState([]);

  const handleDetections = (data) => {
    setDetections(data);
  };

  return (
    <div style={{textAlign: "center", padding: "20px" }}>
      <h1>Brand And Image Recognition</h1>

      {/* Form to upload image and detect */}
      <DetectionForm onDetect={handleDetections} />

      {/* Conditionally render the table or a message */}
      {detections.length > 0 ? (
        <DetectionTable detections={detections} />
      ):' '}
    </div>
  );
};

export default App;


