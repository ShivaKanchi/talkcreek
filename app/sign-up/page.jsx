"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "@components/AuthForm";
const signUp = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify({
          session: session?.user.id,
          email: user.email,
          username: user.username,
          password: user.password,
          image: user.image,
        }),
      });

      if (response.ok) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AuthForm
      type="signup"
      user={user}
      setUser={setUser}
      submitting={submitting}
      handleSubmit={registerUser}
    />
  );
};

export default signUp;
