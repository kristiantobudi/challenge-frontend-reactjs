import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoginSettings } from "./loginSettings";

export const LoginForm = () => {
  const {
    showPassword,
    toggleShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = LoginSettings();

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-md">
        <h1 className="px-6 py-2 mt-3 text-3xl font-bold text-lime-500 text-start">
          Login
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2">
          <form className="p-6 rounded-none" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-lime-500"
              >
                Username: admin
              </label>
              <input
                id="username"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-400"
                {...register("username", { required: true })}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-sm text-red-500">Username is required</p>
              )}
            </div>
            <div className="relative mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-lime-500"
              >
                Password: admin
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-400"
                {...register("password", { required: true })}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">Password is required</p>
              )}
              <div
                onClick={toggleShowPassword}
                className="absolute inset-y-0 flex items-center cursor-pointer top-1/2 right-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-5 py-2 text-sm font-bold text-center text-white rounded-lg sm:text-sm lg:text-lg bg-lime-500 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime -300 sm:w-full"
            >
              Login
            </button>
          </form>
          <div className="mb-5 ml-4">
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
