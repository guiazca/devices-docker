import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
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
          await axios.post(`${API_URL}/software/import`, formData, {
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

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/software/export', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'softwares.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting CSV', error);
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
