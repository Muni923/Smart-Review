import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
    const [username, Setusename] = useState("");
    const [email, Setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const req = await axios.post('https://smart-review-kunk.onrender.com/signup',
                {
                    username,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            if (req.data.success) {
                navigate('/login')
            }
            else {
                alert(req.data.message);
            }
        }
        catch (err) {
            alert(err.message);

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
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black "
                        onChange={(e) => Setusename(e.target.value)} />


                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black "
                        onChange={(e) => Setemail(e.target.value)} />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                        onChange={(e) => setpassword(e.target.value)} />

                    <div className="flex justify-between gap-4 mt-2">


                        <button
                            type="submit"
                            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                        >
                            SignUp
                        </button>
                    </div>
                </form>

                <div className="flex justify-center mt-2">Already have an Account?
                    <Link className=" text-blue-500 ml-1" to='/login'> Login Here</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;