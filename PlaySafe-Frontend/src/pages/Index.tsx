import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const Index = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [playerId, setPlayerId] = useState<string>("player_001");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!video) return alert("Upload a video first");

    const formData = new FormData();
    formData.append("player_id", playerId);
    formData.append("file", video);

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/analyze-match/",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      setResult(data);
    } catch {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  const teamA = result?.teamA;
  const teamB = result?.teamB;

  const goalProbabilityA = teamA?.goal_probability
    ? teamA.goal_probability * 100
    : 0;

  const goalProbabilityB = teamB?.goal_probability
    ? teamB.goal_probability * 100
    : 0;

  return (
    <div className="dashboard">
      <h1 className="title">PlaySafe Tactical Intelligence</h1>

      <div className="card upload-card">
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Player ID"
          className="input"
        />

        <input type="file" accept="video/*" onChange={handleVideoUpload} />

        {previewUrl && (
          <>
            <video src={previewUrl} controls className="video" />
            <button onClick={handleAnalyze} className="btn">
              {loading ? "Analyzing..." : "Analyze Match"}
            </button>
          </>
        )}
      </div>

      {result && (
        <div className="report">

          {/* METRICS */}
          <div className="metrics">

            <div className="metric green">
              <h3>Team A Formation</h3>
              <h2>{teamA?.formation || "N/A"}</h2>
            </div>

            <div className="metric blue">
              <h3>Team A Goal Probability</h3>
              <h2>{goalProbabilityA.toFixed(0)}%</h2>
            </div>

            <div className="metric pink">
              <h3>Team B Goal Probability</h3>
              <h2>{goalProbabilityB.toFixed(0)}%</h2>
            </div>

          </div>

          {/* BAR CHART */}
          <div className="chart-card">
            <h3>Goal Probability Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Team A", value: goalProbabilityA },
                  { name: "Team B", value: goalProbabilityB },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LINE CHART */}
          <div className="chart-card">
            <h3>Team A Tactical Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { name: "Start", value: goalProbabilityA * 0.6 },
                  { name: "Mid", value: goalProbabilityA * 0.8 },
                  { name: "End", value: goalProbabilityA },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* FLOW */}
          <div className="flow-card">
            <h3>AI Tactical Flow</h3>
            <div className="flow">
              <span>Video</span>
              <span>→</span>
              <span>Jersey Detection</span>
              <span>→</span>
              <span>Formation Analysis</span>
              <span>→</span>
              <span>Goal Modeling</span>
              <span>→</span>
              <span>Probability Output</span>
            </div>
          </div>

          {result.processed_video && (
            <div className="chart-card">
              <h3>Annotated Tactical Output</h3>
              <video
                controls
                className="video"
                src={`http://127.0.0.1:8000/${result.processed_video}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
