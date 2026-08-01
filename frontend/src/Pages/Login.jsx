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
            const res = await axios.post("http://localhost:3333/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            // console.log(res.data);
            if (res.data.success) {
                navigate("/home");
            }
            else {
                alert(res.data.message)
            }


        }
        catch (err) {

            alert("Login failed");
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h1 className="text-3xl font-bold text-center mb-6">
                    SmartReview
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
            </div>
        </div>
    );
}

export default Login;