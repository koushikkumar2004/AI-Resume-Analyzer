import { useState } from "react";
import { analyzeResume } from "../services/resumeService";

function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeResume(
        file,
        jobDescription
      );

      setAnalysis(response);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>AI Resume Analyzer</h1>

      <h3>Select Resume</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setAnalysis(null);
          }
        }}
      />

      <br />
      <br />

      <h3>Job Description</h3>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        rows={10}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {analysis && (
        <div style={{ marginTop: "30px" }}>
          <h2>Analysis Results</h2>

          <h3>ATS Score</h3>
          <p>{analysis.ats_score}%</p>

          <h3>Job Match</h3>
          <p>{analysis.match_percentage}%</p>

          <h3>Matched Skills</h3>

          <ul>
            {analysis.matched_skills.map(
              (skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Missing Skills</h3>

          <ul>
            {analysis.missing_skills.map(
              (skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Resume Information</h3>

          <p>
            <strong>Name:</strong>{" "}
            {analysis.resume.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {analysis.resume.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {analysis.resume.phone}
          </p>

          <h3>Skills</h3>

          <ul>
            {analysis.resume.skills.map(
              (skill: string, index: number) => (
                <li key={index}>{skill}</li>
              )
            )}
          </ul>

          <h3>Education</h3>

          <ul>
            {analysis.resume.education.map(
              (education: string, index: number) => (
                <li key={index}>{education}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;