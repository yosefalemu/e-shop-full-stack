"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Inputs";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
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
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }
  return (
    <>
      <Heading text="Sign in to E-shop" />
      <Button
        label="Continue with Google"
        outline
        onClick={() => {
          signIn("google");
        }}
      />
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
