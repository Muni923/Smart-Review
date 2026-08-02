import React, { useState} from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Markdown from "react-markdown";
import Logout from "../Components/Logout";
function Home() {
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [AIresponse, SetAIresponse] = useState("");
    const [loading, Setloading] = useState(false);

    const reviewCode = async () => {
      try {
        Setloading(true);
        const res = await axios.post(
          "https://smart-review-kunk.onrender.com/ai/review",
          { language, code },
          { withCredentials: true }
        );

        SetAIresponse(res.data.review);
      } catch (err) {
        alert("Review Failed");
        setCode("");
        SetAIresponse("");
        setLanguage("");
      } finally {
        Setloading(false);
      }
    };
    return (
      <div className="min-h-screen bg-gray-100">
        <Logout></Logout>

        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className="border rounded-lg px-4 py-2 w-full sm:w-56 bg-white"
            >
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={reviewCode}
              disabled={loading}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
              {loading ? "Reviewing..." : "Review Code"}
            </button>

            {loading && (
              <div className="flex justify-center sm:justify-start">
                <ThreeDots height="40" width="60" />
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              placeholder="Write your code..."
              className="w-full lg:w-1/2 h-[400px] lg:h-[550px] border rounded-lg p-4 resize-none bg-white"
            />

            <div className="w-full lg:w-1/2 h-[400px] lg:h-[550px] border rounded-lg p-4 overflow-auto whitespace-pre-wrap bg-white">
              {!AIresponse && (
                <p className="text-gray-500">Review will be displayed here...</p>
              )}
              <Markdown>{AIresponse}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Home;