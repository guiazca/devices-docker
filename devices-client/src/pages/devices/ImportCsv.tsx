import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../apiContants';

const ImportCsv = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://${API_URL}/Dispositivos/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      alert("There was an error uploading the file.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImportCsv;
