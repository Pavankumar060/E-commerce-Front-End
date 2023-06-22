import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onLogIn } from "../APIcalls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  })
  .required();

const Login = () => {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const onFinalSubmit = async (data) => {
    try {
      const response = await onLogIn({
        email: data.email,
        password: data.password,
      });

      toast("login success", {
        type: "success",
        theme: "colored",
      });
      const cartID = response?.data?.cartId;
      const token = response?.data?.token;
      const userName = response?.data?.userName;

      localStorage.setItem("E-COMM-cartID", cartID);
      localStorage.setItem("E-COMM-token", token);
      localStorage.setItem("E-COMM-userName", userName);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message, {
        type: "error",
        theme: "colored",
      });
    }
  };
  return (
    <div
      style={{
        border: "5px outset #FCC696",
        display: "flex",
        alignContent: "center",
      }}
    >
      <img
        src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
        alt="Logo"
        width={500}
      />

      <form onSubmit={handleSubmit(onFinalSubmit)}>
        <div>
          <div>
            <h2 style={{ color: "#D43DF9" }}>Log-In</h2>
            <input type={"email"} {...register("email")} placeholder="E-mail" />
          </div>

          <div>
            <input
              type={"password"}
              {...register("password")}
              placeholder={"Password"}
            />
          </div>
        </div>

        <button style={{ borderRadius: 15 }}>Login</button>
        <h6>
          Doesn't have an account?{" "}
          <a style={{ color: "blue" }} href="/signup">
            Sign-up
          </a>
        </h6>
      </form>
    </div>
  );
};

export default Login;
