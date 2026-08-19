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

  const downloadReport = () => {
    if (!analysis) {
      return;
    }

    const report = `
AI RESUME ANALYZER
==================

ATS Score: ${analysis.ats_score}%
Job Match: ${analysis.match_percentage}%

MATCHED SKILLS
-------------
${analysis.matched_skills
  .map((skill: string) => `- ${skill}`)
  .join("\n")}

MISSING SKILLS
-------------
${analysis.missing_skills
  .map((skill: string) => `- ${skill}`)
  .join("\n")}

RESUME INFORMATION
------------------
Name: ${analysis.resume.name || "Not detected"}
Email: ${analysis.resume.email || "Not detected"}
Phone: ${analysis.resume.phone || "Not detected"}

EDUCATION
---------
${analysis.resume.education
  .map((education: string) => `- ${education}`)
  .join("\n")}

IMPROVEMENT SUGGESTIONS
-----------------------
${analysis.suggestions
  .map((suggestion: string) => `- ${suggestion}`)
  .join("\n")}
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "resume-analysis-report.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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
          if (
            e.target.files &&
            e.target.files.length > 0
          ) {
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
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
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
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {analysis && (
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            textAlign: "left",
          }}
        >
          <h2>Resume Analysis</h2>

          {/* Download Report */}

          <button
            onClick={downloadReport}
            style={{
              marginTop: "10px",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            📥 Download Analysis Report
          </button>

          {/* Score Cards */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <h3>ATS Score</h3>

              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "10px 0",
                }}
              >
                {analysis.ats_score}%
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <h3>Job Match</h3>

              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "10px 0",
                }}
              >
                {analysis.match_percentage}%
              </p>
            </div>
          </div>

          {/* Education */}

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h3>Education</h3>

            <ul
              style={{
                paddingLeft: "25px",
                textAlign: "left",
              }}
            >
              {analysis.resume.education.map(
                (
                  education: string,
                  index: number
                ) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      paddingLeft: "5px",
                      lineHeight: "1.5",
                    }}
                  >
                    {education}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Matched Skills */}

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h3>Matched Skills</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {analysis.matched_skills.map(
                (
                  skill: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      backgroundColor: "#e8f5e9",
                    }}
                  >
                    ✓ {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Missing Skills */}

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h3>Missing Skills</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {analysis.missing_skills.map(
                (
                  skill: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "20px",
                      backgroundColor: "#ffebee",
                    }}
                  >
                    ✗ {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Resume Suggestions */}

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h3>
              Resume Improvement Suggestions
            </h3>

            <ul
              style={{
                margin: "15px 0 0 0",
                paddingLeft: "25px",
                textAlign: "left",
              }}
            >
              {analysis.suggestions.map(
                (
                  suggestion: string,
                  index: number
                ) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "12px",
                      paddingLeft: "5px",
                      lineHeight: "1.5",
                    }}
                  >
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resume Information */}

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
            }}
          >
            <h3>Resume Information</h3>

            <p>
              <strong>Name:</strong>{" "}
              {analysis.resume.name ||
                "Not detected"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {analysis.resume.email ||
                "Not detected"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {analysis.resume.phone ||
                "Not detected"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;