"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "@components/AuthForm";
import { signIn as signInAuth } from "next-auth/react";
const signIn = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let username = user.username;
      let password = user.password;
      const response = await signInAuth("credentials", {
        username,
        password,
        redirect: false,
      });
      // const response = await fetch("/api/sign-in", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: user.username,
      //     password: user.password,
      //   }),
      // });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AuthForm
      type="signin"
      user={user}
      setUser={setUser}
      submitting={submitting}
      handleSubmit={loginUser}
    />
  );
};

export default signIn;
