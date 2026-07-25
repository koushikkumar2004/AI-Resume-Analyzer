import { useState } from "react";
import { uploadResume } from "../services/resumeService";

function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      const response = await uploadResume(file);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeUploader;