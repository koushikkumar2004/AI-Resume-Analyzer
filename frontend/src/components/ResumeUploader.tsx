import { useState } from "react";
import { jsPDF } from "jspdf";
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

    const doc = new jsPDF();

    let y = 20;

    const addText = (
      text: string,
      fontSize = 11,
      bold = false
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont(
        "helvetica",
        bold ? "bold" : "normal"
      );

      const lines = doc.splitTextToSize(
        text,
        170
      );

      if (y + lines.length * 6 > 275) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, 20, y);

      y += lines.length * 6 + 4;
    };

    addText(
      "AI RESUME ANALYZER",
      20,
      true
    );

    y += 5;

    addText(
      `ATS Score: ${analysis.ats_score}%`,
      13,
      true
    );

    addText(
      `Job Match: ${analysis.match_percentage}%`,
      13,
      true
    );

    y += 5;

    addText(
      "MATCHED SKILLS",
      14,
      true
    );

    if (analysis.matched_skills.length > 0) {
      analysis.matched_skills.forEach(
        (skill: string) => {
          addText(`• ${skill}`);
        }
      );
    } else {
      addText("No matched skills detected.");
    }

    y += 3;

    addText(
      "MISSING SKILLS",
      14,
      true
    );

    if (analysis.missing_skills.length > 0) {
      analysis.missing_skills.forEach(
        (skill: string) => {
          addText(`• ${skill}`);
        }
      );
    } else {
      addText("No missing skills detected.");
    }

    y += 3;

    addText(
      "RESUME INFORMATION",
      14,
      true
    );

    addText(
      `Name: ${
        analysis.resume.name ||
        "Not detected"
      }`
    );

    addText(
      `Email: ${
        analysis.resume.email ||
        "Not detected"
      }`
    );

    addText(
      `Phone: ${
        analysis.resume.phone ||
        "Not detected"
      }`
    );

    y += 3;

    addText(
      "EDUCATION",
      14,
      true
    );

    if (
      analysis.resume.education &&
      analysis.resume.education.length > 0
    ) {
      analysis.resume.education.forEach(
        (education: string) => {
          addText(`• ${education}`);
        }
      );
    } else {
      addText(
        "No education information detected."
      );
    }

    y += 3;

    addText(
      "RESUME IMPROVEMENT SUGGESTIONS",
      14,
      true
    );

    if (
      analysis.suggestions &&
      analysis.suggestions.length > 0
    ) {
      analysis.suggestions.forEach(
        (suggestion: string) => {
          addText(`• ${suggestion}`);
        }
      );
    } else {
      addText(
        "No improvement suggestions."
      );
    }

    doc.save(
      "resume-analysis-report.pdf"
    );
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Main Page Heading */}

      <h1
        style={{
          color: "#f3f4f6",
          fontSize: "36px",
          fontWeight: "700",
        }}
      >
        AI Resume Analyzer
      </h1>

      {/* Resume Upload */}

      <h3
        style={{
          color: "#f3f4f6",
        }}
      >
        Select Resume
      </h3>

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

      {/* Job Description */}

      <h3
        style={{
          color: "#f3f4f6",
        }}
      >
        Job Description
      </h3>

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
          border: "1px solid #d1d5db",
          resize: "vertical",
          boxSizing: "border-box",
          color: "#111827",
          backgroundColor: "#ffffff",
          fontSize: "14px",
        }}
      />

      <br />
      <br />

      {/* Analyze Button */}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "11px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ffffff",
          color: "#111827",
          cursor: loading
            ? "not-allowed"
            : "pointer",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {/* Analysis */}

      {analysis && (
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#111827",
            textAlign: "left",
            opacity: 1,
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Analysis Heading */}

          <h2
            style={{
              color: "#111827",
              fontSize: "28px",
              fontWeight: "700",
              marginTop: "0",
              marginBottom: "15px",
            }}
          >
            Resume Analysis
          </h2>

          {/* Download Report */}

          <button
            onClick={downloadReport}
            style={{
              marginTop: "10px",
              padding: "11px 18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#111827",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            📥 Download Analysis Report
          </button>

          {/* Score Cards */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            {/* ATS Score */}

            <div
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "20px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#111827",
              }}
            >
              <h3
                style={{
                  color: "#374151",
                  fontWeight: "700",
                  marginTop: "0",
                }}
              >
                ATS Score
              </h3>

              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  margin: "10px 0",
                  color: "#111827",
                }}
              >
                {analysis.ats_score}%
              </p>
            </div>

            {/* Job Match */}

            <div
              style={{
                flex: 1,
                minWidth: "200px",
                padding: "20px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#111827",
              }}
            >
              <h3
                style={{
                  color: "#374151",
                  fontWeight: "700",
                  marginTop: "0",
                }}
              >
                Job Match
              </h3>

              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  margin: "10px 0",
                  color: "#111827",
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
              color: "#111827",
            }}
          >
            <h3
              style={{
                color: "#374151",
                fontWeight: "700",
              }}
            >
              Education
            </h3>

            <ul
              style={{
                margin: "15px 0 0 0",
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
                      color: "#374151",
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
            <h3
              style={{
                color: "#374151",
                fontWeight: "700",
              }}
            >
              Matched Skills
            </h3>

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
                      backgroundColor:
                        "#e8f5e9",
                      color: "#166534",
                      fontSize: "13px",
                      fontWeight: "600",
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
            <h3
              style={{
                color: "#374151",
                fontWeight: "700",
              }}
            >
              Missing Skills
            </h3>

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
                      backgroundColor:
                        "#ffebee",
                      color: "#b91c1c",
                      fontSize: "13px",
                      fontWeight: "600",
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
            <h3
              style={{
                color: "#374151",
                fontWeight: "700",
              }}
            >
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
                      color: "#374151",
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
              color: "#111827",
            }}
          >
            <h3
              style={{
                color: "#374151",
                fontWeight: "700",
              }}
            >
              Resume Information
            </h3>

            <p style={{ color: "#374151" }}>
              <strong>Name:</strong>{" "}
              {analysis.resume.name ||
                "Not detected"}
            </p>

            <p style={{ color: "#374151" }}>
              <strong>Email:</strong>{" "}
              {analysis.resume.email ||
                "Not detected"}
            </p>

            <p style={{ color: "#374151" }}>
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