"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "@components/Form";
const createTalk = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    talk: "",
    tag: "",
  });
  const createTalk = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/talk/new", {
        method: "POST",
        body: {
          userId: session?.user.id,
          talk: post.talk,
          tag: post.tag,
        },
      });

      if (response.ok) {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={setSubmitting}
      handleSubmit={createTalk}
    />
  );
};

export default createTalk;
