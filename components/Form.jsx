import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share interesting talk with the world, and let your
        imagination run wild with any topics.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Topic:
          </span>
          <textarea
            value={post.talk}
            onChange={(e) => setPost({ ...post, talk: e.target.value })}
            placeholder="Write your opinions..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold   text-base text-gray-700">
            Tag:
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#price, #india, #webdev"
            required
            className="form_input"
          />
        </label>
        <div></div>
      </form>
    </section>
  );
};

export default Form;
