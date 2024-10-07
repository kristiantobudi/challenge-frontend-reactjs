import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === "admin" && data.password === "admin") {
      localStorage.setItem("usename", data.username);
      localStorage.setItem("password", data.password);
      navigate('/quiz/1');
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="rounded-lg shadow-md overflow-hidden max-w-6xl w-full bg-white">
        <h1 className="text-3xl font-bold text-lime-500 text-start px-6 py-2 mt-3">
          Login
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
          <form className="p-6 rounded-none" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-lime-500"
              >
                Username:
              </label>
              <input
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-400 block w-full p-2"
                {...register("username", { required: true })}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">Username is required</p>
              )}
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-lime-500"
              >
                Password:
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-400 block w-full p-2"
                {...register("password", { required: true })}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              <div
                onClick={toggleShowPassword}
                className="absolute inset-y-0 top-1/2 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              className="text-sm sm:text-sm lg:text-lg font-bold text-white bg-lime-500 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime -300 rounded-lg w-full sm:w-full px-5 py-2 text-center"
            >
              Login
            </button>
          </form>
          <div className="ml-4 mb-5">
            <div>
              <img
                src="/public/login.png"
                className="p-2 rounded-lg"
                alt="login"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
