import { useState } from "react";

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
    if (!video) {
      alert("Upload a video first");
      return;
    }

    const formData = new FormData();
    formData.append("player_id", playerId); // ✅ REQUIRED
    formData.append("file", video);

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze-match/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert("Backend error. Check terminal.");
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend not running or CORS error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Match Analysis Dashboard
      </h1>

      {/* Player ID Input */}
      <input
        type="text"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Enter Player ID"
        className="border p-2 rounded mb-4 w-full"
      />

      {/* Upload Section */}
      <div className="border-2 border-dashed rounded-xl p-8 text-center mb-8">
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="mb-4"
        />
        <p className="text-muted-foreground">
          Upload overhead match footage to analyze formations
        </p>
      </div>

      {/* Video Preview */}
      {previewUrl && (
        <div className="mt-6">
          <video
            src={previewUrl}
            controls
            className="w-full rounded-xl shadow-lg"
          />

          <button
            onClick={handleAnalyze}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Match"}
          </button>
        </div>
      )}

      {/* ML Result Display */}
      {result && (
        <div className="mt-8 p-6 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
          <pre className="text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Index;
