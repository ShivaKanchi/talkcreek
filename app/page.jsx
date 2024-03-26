import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col ">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Interesting topics and discussions
        </span>
      </h1>
      <p className="desc text-center">
        Talkcreek is a place where people discuss and share their opnions on
        topics
      </p>
      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
