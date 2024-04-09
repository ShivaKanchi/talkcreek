"use client";

import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
const TalkCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout flex justify-center items-start flex-wrap">
      {data.length > 0 ? (
        data.map((post) => (
          <TopicCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p className=" text-sm text-gray-500">No Posts Found</p>
      )}
    </div>
  );
};
const Feed = () => {
  const [posts, setPosts] = useState([]);
  // Search
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/talk");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTopics = (searchText) => {
    if (searchText != "") {
      const searchRegex = new RegExp(searchText, "i");
      return posts.filter(
        (post) =>
          searchRegex.test(post.creator.username) ||
          searchRegex.test(post.tag) ||
          searchRegex.test(post.topic)
      );
    }
  };

  const handleSearchChange = (e) => {
    let text = e.target.value;
    clearTimeout(searchTimeout);
    setSearchText(text);

    // Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTopics(text);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    const searchResult = filterTopics(tagname);
    setSearchedResults(searchResult);
  };
  const resetSearch = () => {
    setSearchText("");
    setSearchedResults([]);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a topic or a username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />

        {searchText && (
          <input
            type="reset"
            value="reset"
            className="outline_btn absolute top-[65px]"
            onClick={resetSearch}
          />
        )}
      </form>
      {/*  */}
      <TalkCardList
        data={searchedResults?.length > 0 ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
