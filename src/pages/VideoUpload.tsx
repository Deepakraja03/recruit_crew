import React, { useState } from "react";

const VideoUpload: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ objects: string[]; summary: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            alert("Please select a video file!");
            return;
        }

        const formData = new FormData();
        formData.append("video", file);

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/process_video", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResult({
                    objects: data.objects || [],  // Ensure objects is always an array
                    summary: data.summary || "No summary available.",
                });
            }
        } catch (err) {
            console.error(err);
            setError("Failed to process video.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Upload a Video for Analysis</h2>
                <input
                    type="file"
                    accept="video/*"
                    onChange={uploadVideo}
                    className="w-full p-2 border border-gray-300 rounded-md mt-4"
                />
                {loading && <p className="text-orange-600 font-semibold mt-2">Analyzing video... Please wait.</p>}
                {error && <p className="text-red-600 mt-2">Error: {error}</p>}
                
                {result && (
                    <div className="mt-4 text-gray-800">
                        <h3 className="text-lg font-semibold">Analysis Result:</h3>
                        
                        <p className="font-medium">Objects Detected:</p>
                        {result.objects.length > 0 ? (
                            <ul className="list-disc list-inside bg-gray-200 p-2 rounded-md mt-2">
                                {result.objects.map((obj, index) => (
                                    <li key={index} className="text-sm">{obj}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm italic mt-2">No objects detected.</p>
                        )}

                        <p className="font-medium mt-2">AI Summary:</p>
                        <p className="bg-gray-200 p-2 rounded-md">{result.summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoUpload;