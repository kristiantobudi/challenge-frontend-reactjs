import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginSettings = () => {
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
        sessionStorage.removeItem("countdownEndTime");
        navigate("/quiz/1");
      } else {
        alert("Invalid username or password!");
      }
    };

    return {
        showPassword,
        toggleShowPassword,
        register,
        handleSubmit,
        onSubmit,
        errors
    }
}