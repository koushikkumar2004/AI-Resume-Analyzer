import { useState } from "react";
import { parseResume } from "../services/resumeService";

function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      const response = await parseResume(file);

      setResumeData(response);
    } catch (error) {
      console.error(error);
      alert("Failed to parse resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);

            // Clear previous result
            setResumeData({
              name: "",
              email: "",
              phone: "",
            });
          }
        }}
      />

      <br />
      <br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Parsing Resume..." : "Parse Resume"}
      </button>

      {resumeData.name && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
          }}
        >
          <h2>Parsed Resume</h2>

          <p>
            <strong>Name:</strong> {resumeData.name}
          </p>

          <p>
            <strong>Email:</strong> {resumeData.email}
          </p>

          <p>
            <strong>Phone:</strong> {resumeData.phone}
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;