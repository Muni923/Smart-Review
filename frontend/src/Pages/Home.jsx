import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';
import Markdown from 'react-markdown'
function Home() {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [AIresponse, SetAIresponse] = useState("");
  const [loading, Setloading] = useState(false);

  const reviewCode = async () => {
    try {
      Setloading(true);
      const res = await axios.post(
        "http://localhost:3333/ai/review",
        { language, code },
        { withCredentials: true }
      );
      Setloading(false);

      SetAIresponse(res.data.review);
    } catch (err) {
      alert("Review Failed");
      setCode("");
      SetAIresponse("");
      setLanguage("");
    }
    finally {
      Setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={loading}
          className="border rounded px-3 py-2 w-full sm:w-56"
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        {loading &&
          <div className="h-full flex justify-center items-center">
            <ThreeDots
              height="40"
              width="70"

            />
          </div>
        }
        <button
          onClick={reviewCode}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review Code"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code..."
          className="w-full lg:w-1/2 h-[400px] lg:h-[550px] border rounded p-3 resize-none"
        />

        <div className="w-full lg:w-1/2 h-[400px] lg:h-[550px] border rounded p-3 overflow-auto whitespace-pre-wrap bg-white">
          <Markdown>{AIresponse}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default Home;