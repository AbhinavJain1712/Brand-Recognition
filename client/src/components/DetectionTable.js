
import React from "react";

const DetectionTable = ({ detections }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Results:</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          maxWidth: "800px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Timestamp</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Brand</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {detections.map((detection, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px 20px", whiteSpace: "nowrap" }}>
                {detection.timestamp}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {detection.brand}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {detection.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetectionTable;



