import { useNavigate } from "react-router-dom"

function ErrorPage() {

    const navigate = useNavigate()
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col">

            <h1 className="text-9xl font-bold "> 404</h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute  "> 
            Page not found...
            </div>

            <button onClick={()=>{
                navigate(-1)
            }} className="border font-semibold p-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-600 hover:text-blue-600">
                Go Back
            </button>

        </div>
    )
}

export default ErrorPage