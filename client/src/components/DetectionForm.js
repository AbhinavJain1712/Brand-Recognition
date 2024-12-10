import React, { useState } from "react";
import axios from "axios";

const DetectionForm = ({ onDetect }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    onDetect([]); 
  };

  const handleSubmit = async (e) => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    try {
      // Axios POST request
      const response = await axios.post("https://brand-recognition.onrender.com/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const rawData = response.data;
  
      // Generate timestamp
      const formatTimestamp = (isoTimestamp) => {
        const date = new Date(isoTimestamp);
      
        // Format the ISO string without milliseconds and 'Z' at the end
        const isoString = date.toISOString().slice(0, 19); // Removing milliseconds and 'Z'
      
        // Return the formatted string with fixed +05:30 offset
        return `${isoString}+05:30`;
      };
      
  
      // Process the raw response data to count occurrences of each brand
      if (!Array.isArray(rawData) || !rawData.every(item => item.hasOwnProperty('brand'))) {
        throw new Error("Invalid data format: rawData should be an array of objects with a 'brand' property.");
      }
  
      const aggregatedData = Object.entries(
        rawData.reduce((acc, item) => {
          const brand = item.brand;
          acc[brand] = (acc[brand] || 0) + 1;
          return acc;
        }, {})
      ).map(([brand, count]) => ({
        timestamp: formatTimestamp(new Date().toISOString()), // Add the current timestamp
        brand, // Use the brand string
        count, // Ensure count is a number
      }));
  
      onDetect(aggregatedData); // Pass processed data to parent component
    } catch (error) {
      alert('Please Upload valid image')
      console.error("Error uploading file:", error.message);
    }finally {
      setLoading(false);
    }
  };
  

  return (
    <form>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Detect</button>
      {loading && <p>Processing...</p>}
    </form>
  );
};

export default DetectionForm;