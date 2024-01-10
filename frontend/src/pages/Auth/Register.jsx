import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="pl-4 md:pl-[10rem] flex flex-wrap">
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3 mt-4 md:mt-0">
      <h1 className="text-2xl md:text-4xl font-semibold mb-4">Register</h1>
  
      <form onSubmit={submitHandler} className="container md:w-[40rem]">
        <div className="my-4">
          <label htmlFor="name" className="block text-sm md:text-base font-medium text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
  
        <div className="my-4">
          <label htmlFor="email" className="block text-sm md:text-base font-medium text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div className="my-4">
          <label htmlFor="password" className="block text-sm md:text-base font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <div className="my-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm md:text-base font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
  
        <button
          disabled={isLoading}
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-4"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
  
        {isLoading && <Loader />}
      </form>
  
      <div className="mt-4">
        <p className="text-white">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-pink-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    <img
      src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
      alt=""
      className="h-64 md:h-[65rem] w-full md:w-[59%] rounded-lg"
    />
  </section>
  
  );
};

export default Register;
