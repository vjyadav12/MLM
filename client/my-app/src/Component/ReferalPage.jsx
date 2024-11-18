import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const UserReference = () => {

    // vjjjjj

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // vjjj

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ReferalID, setReferal] = useState(""); // Corrected to ReferalID

    const collectData = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                `http://localhost:5656/${ReferalID}`,
                {

                    name,
                    age,
                    email,
                    password,
                    // Use ReferalID here
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(result);
            toast.success("Successfully logged in");
            navigate("/");
        } catch (e) {
            console.log(e);
            toast.error(e.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center flex-col justify-center w-full">
            <div className="shadow-2xl w-1/2 flex flex-col items-center shadow-white m-auto">
                <div className="py-7">
                    <FaUserCircle
                        className="w-24 h-24 rounded-full m-auto cursor-pointer"
                        style={{ height: "4cm", width: "auto" }}
                    />
                </div>

                <h3 className="m-3">
                    <b>Referal USER</b>
                </h3>

                <div className="flex flex-col gap-2">
                    <input
                        className="p-2 rounded-xl"
                        type="text"
                        name="Referal"
                        id="Referal"
                        placeholder="Referal ID"
                        value={ReferalID} // Corrected to ReferalID
                        onChange={(e) => {
                            setReferal(e.target.value); // Corrected to setReferal
                        }}
                    />

                    {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}

                     <input
            className="p-2 rounded-xl"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className=" p-2 rounded-xl"
            type="text"
            name="age"
            id="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className=" p-2 rounded-xl"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="m p-2  rounded-xl"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


                    {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}
                </div>

                <button
                    className="border border-white rounded-xl bg-blue-700 hover:text-black text-white hover:bg-white px-8 py-[1.8px] m-4"
                    onClick={collectData}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UserReference;
