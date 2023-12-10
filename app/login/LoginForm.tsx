"use client";
import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Inputs";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const handleLogin: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };
  return (
    <>
      <Heading text="Sign in to E-shop" />
      <Button label="Continue with Google" outline onClick={() => {}} />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
        type="email"
        required
      />
      <Input
        id="password"
        label="Password"
        register={register}
        errors={errors}
        disabled={isLoading}
        type="password"
        required
      />
      <Button
        disabled={isLoading}
        label={isLoading ? "Loading..." : "Login"}
        onClick={handleSubmit(handleLogin)}
      />
      <p className="flex items-center text-sm gap-2">
        <span>Don't have an account</span>
        <Link href="/register" className="underline">
          Signup
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
