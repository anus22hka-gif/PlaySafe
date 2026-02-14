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
  Legend,
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

  const goalA = teamA?.goal_probability
    ? teamA.goal_probability * 100
    : 0;

  const goalB = teamB?.goal_probability
    ? teamB.goal_probability * 100
    : 0;

  const confidence = result?.model_confidence
    ? result.model_confidence * 100
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

          {/* TOP METRICS */}
          <div className="metrics">
            <div className="metric green">
              <h3>Team A Formation</h3>
              <h2>{teamA?.formation || "N/A"}</h2>
            </div>

            <div className="metric blue">
              <h3>Team A Goal %</h3>
              <h2>{goalA.toFixed(0)}%</h2>
            </div>

            <div className="metric pink">
              <h3>Team B Goal %</h3>
              <h2>{goalB.toFixed(0)}%</h2>
            </div>

            <div className="metric purple">
              <h3>Model Confidence</h3>
              <h2>{confidence.toFixed(0)}%</h2>
            </div>
          </div>

          {/* COMPARISON BAR CHART */}
          <div className="chart-card">
            <h3>Team Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={[
                  {
                    metric: "Goal %",
                    TeamA: goalA,
                    TeamB: goalB,
                  },
                  {
                    metric: "Tactical Score",
                    TeamA: teamA?.tactical_score * 100 || 0,
                    TeamB: teamB?.tactical_score * 100 || 0,
                  },
                  {
                    metric: "Possession",
                    TeamA: teamA?.possession_rate * 100 || 0,
                    TeamB: teamB?.possession_rate * 100 || 0,
                  },
                  {
                    metric: "Pressing",
                    TeamA: teamA?.pressing_intensity * 100 || 0,
                    TeamB: teamB?.pressing_intensity * 100 || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="TeamA" fill="#22c55e" />
                <Bar dataKey="TeamB" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TACTICAL TREND */}
          <div className="chart-card">
            <h3>Tactical Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { name: "Start", A: goalA * 0.6, B: goalB * 0.6 },
                  { name: "Mid", A: goalA * 0.8, B: goalB * 0.8 },
                  { name: "End", A: goalA, B: goalB },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="A" stroke="#22c55e" strokeWidth={4} />
                <Line type="monotone" dataKey="B" stroke="#ec4899" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {result?.processed_video_path && (
            <div className="chart-card">
              <h3>Annotated Match Output</h3>
              <video
                controls
                className="video"
                src={`http://127.0.0.1:8000/${result.processed_video_path}`}
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Index;
