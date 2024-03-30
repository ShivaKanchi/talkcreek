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
  const createTalk = async (e) => {};
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
