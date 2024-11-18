import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// import { collectData } from "./axiosCall";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [previewImage, setPreviewImage] = useState("");

  // export this function to other file
  const collectData = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        "http://localhost:5656/Register",
        {
          name,
          age,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(result);
      toast.success("Account Created Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };
  // ---------------------

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    const fileReader = new FileReader();
    // fileReader.readAsDataURL(uploadedImage);
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      // console.log(this.result)
      setPreviewImage(this.result);
    });
    setPreviewImage("");
  }

  return (
    <div className="bg-[#1d232a] min-h-screen flex items-center flex-col justify-center w-full ">
      <div className="shadow-2xl w-1/2 m-auto flex flex-col items-center py-7 shadow-white">
        <div className="h-full max-h-30 m-2  ">
          <label htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="Uploaded Preview"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 rounded-full m-auto cursor-pointer" />
            )}
          </label>
        </div>

        <input
          onChange={getImage}
          // className="hidden"
          name="image_uploads"
          type="file"
          id="image_uploads"
          accept=".jpg, .jpeg, .png, .svg"
        />

        <h3 className="m-3">
          <b>USER REGISTER</b>
        </h3>

        {/* INPUT FIELDS */}
        <div className="flex flex-col gap-2">
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

          <button
            className="border border-white rounded-xl bg-blue-700 hover:text-black text-white hover:bg-white"
            onClick={collectData}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
