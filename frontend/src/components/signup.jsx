import { useNavigate } from "react-router-dom";
import { credentialsAtom } from "../../store/atoms/signup";
import { useRecoilState } from "recoil";
import axios from "axios";
export function Signup() {
  const [credentials, setCredentials] = useRecoilState(credentialsAtom);
  const navigate = useNavigate();
  function onChangeHandler(event) {
    setCredentials((old) => {
      return { ...old, [event.target.name]: event.target.value };
    });
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="bg-white rounded-lg p-5 m-4">
        <h2 className="text-3xl font-bold text-center p-2">Sign Up</h2>
        <h4 className="text-lg font-light text-center p-1">
          Enter your information to create an account
        </h4>
        <label className="font-bold">
          First Name<br></br>
          <input
            type="text"
            name="firstName"
            value={credentials.firstName}
            className="p-1 my-3 w-full rounded-md font-normal border-2"
            placeholder="John"
            onChange={onChangeHandler}
          />
        </label>

        <br></br>
        <label className="font-bold">
          Last Name<br></br>
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={credentials.lastName}
            className="p-1 my-2 w-full rounded-md font-normal border-2"
            placeholder="Doe"
          />
        </label>

        <br></br>
        <label className="font-bold">
          Email<br></br>
          <input
            type="email"
            name="username"
            onChange={onChangeHandler}
            value={credentials.username}
            className="p-1 my-2 w-full rounded-md font-normal border-2"
            placeholder="johndoe@example.com"
          />
        </label>

        <br></br>
        <label className="font-bold">
          Password<br></br>
          <input
            type="Password"
            name="password"
            onChange={onChangeHandler}
            value={credentials.password}
            className="p-1 my-2 w-full rounded-md font-normal border-2"
          />
        </label>
        <button
          className="bg-slate-950 text-white font-nomral w-full rounded-lg p-2 my-2"
          onClick={async () => {
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/signup`,
                credentials
              );
              console.log(response.data);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Sign up
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <button
            className="font-bold"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
