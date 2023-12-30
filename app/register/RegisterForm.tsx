"use client";
import Link from "next/link";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Inputs";
import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const onSubmitFunction: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("data", data);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  if (currentUser) {
    return <p className="text-center">Registed. redirecting...</p>;
  }
  return (
    <>
      <Heading text="Sign up for E-shop" />
      <Button
        outline
        label="Continue with Google"
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
        type="text"
      />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
        type="email"
      />
      <Input
        id="password"
        label="Password"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
        type="password"
      />
      <Button
        disabled={isLoading}
        label={isLoading ? "Loading..." : "Sign up"}
        onClick={handleSubmit(onSubmitFunction)}
      />
      <p className="text-sm flex gap-2 items-center">
        <span>Already have an account?</span>
        <Link href="/login" className="underline">
          Signin
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
