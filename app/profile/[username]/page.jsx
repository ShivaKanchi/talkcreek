"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getTopicData = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`);
      const data = await res.json();
      setUserPosts(data);
    };
    if (params?.username) getTopicData();
  }, [params.username]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s interesting topics and views.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
