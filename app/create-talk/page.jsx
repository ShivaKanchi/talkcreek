"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@components/Form";
const createTalk = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    talk: "",
    tag: "",
  });
  const createTalk = async (e) => {
    console.log("body me jara hai", {
      userId: session?.user.id,
      talk: post.talk,
      tag: post.tag,
    });
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/talk/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          talk: post.talk,
          tag: post.tag,
        }),
      });

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
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTalk}
    />
  );
};

export default createTalk;
