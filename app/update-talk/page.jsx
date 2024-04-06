"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@components/Form";
const EditTalk = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    talk: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const talkId = searchParams.get("id");
  useEffect(() => {
    const getTopicData = async () => {
      const res = await fetch(`/api/talk/${talkId}`);
      const data = await res.json();
      setPost({
        talk: data.talk,
        tag: data.tag,
      });
    };
    if (talkId) getTopicData();
  }, [talkId]);
  const updateTalk = async (e) => {
    console.log("body", {
      userId: session?.user.id,
      talk: post.talk,
      tag: post.tag,
    });
    e.preventDefault();
    setSubmitting(true);

    if (!talkId) return alert("talk id not found");
    try {
      const response = await fetch(` /api/talk/${talkId}`, {
        method: "PATCH",
        body: JSON.stringify({
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTalk}
    />
  );
};

export default EditTalk;
