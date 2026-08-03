import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
function Login() {
    const navigate = useNavigate();
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const res = await axios.post("https://smart-review-kunk.onrender.com/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );


            if (res.data.success) {
                navigate("/home");
            }
            else {
                alert(res.data.message)
            }


        }
        catch (err) {

            alert(res.data?.message?.err||"Login failed");
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    𝕾𝖒𝖆𝖗𝖙 𝕽𝖊𝖛𝖎𝖊𝖜
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>


                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                        onChange={(event) => setemail(event.target.value)} />
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black "
                        onChange={(event) => setpassword(event.target.value)}
                    />
                    <div className="flex justify-between gap-4 mt-2">


                        <button
                            type="submit"
                            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-2">Dont have an Account? 
                    <Link className=" text-blue-500 ml-1" to='/signup'> Register Here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;