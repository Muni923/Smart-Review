import React, { useContext } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { MyContext } from "./Auth"

function Logout() {
    const { firstLetter } = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3333/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Logout Failed");
        }
    };
    return (
        <>
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
                        𝕾𝖒𝖆𝖗𝖙 𝕽𝖊𝖛𝖎𝖊𝖜
                    </h1>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                            {firstLetter}
                        </div>

                        <button
                            className="text-xl p-2 rounded-lg hover:bg-gray-200 transition"
                            onClick={handleLogout}
                        > LOGOUT ⏻
                        </button>
                    </div>
                </div>
            </nav></>
    )
}

export default Logout
