import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigator = useNavigate();
  return (
    <div>
      <button
        className="bg-gray-300 rounded-md px-1 mx-1"
        onClick={() => {
          navigator("/dashboard");
        }}
      >
        Dashboard
      </button>
      <button
        className="bg-gray-300 rounded-md px-1 mx-1"
        onClick={() => {
          navigator("/signup");
        }}
      >
        Signup
      </button>
      <button
        className="bg-gray-300 rounded-md px-1 mx-1"
        onClick={() => {
          navigator("/signin");
        }}
      >
        Signin
      </button>
    </div>
  );
}
