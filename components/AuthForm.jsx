import Link from "next/link";

const AuthForm = ({ type, user, setUser, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type == "signin" ? "Sign In" : "Sign Up"}
        </span>
      </h1>
      {/* <p className="desc text-left max-w-md">
        {type} and share interesting talk with the world, and let your
        imagination run wild with any topics.
      </p> */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {type == "signup" && (
          <label>
            <span className="font-satoshi font-semibold   text-base text-gray-700">
              Email:
            </span>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="abcd@gmail.com"
              required
              className="form_input"
            />
          </label>
        )}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username:
          </span>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="abc"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold   text-base text-gray-700">
            Password:
          </span>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder=""
            required
            className="form_input"
          />
        </label>
        {type == "signup" && (
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Image:
            </span>
            <input
              value={user.image}
              onChange={(e) => setUser({ ...user, image: e.target.value })}
              placeholder="Your profile image link..."
              className="form_input"
            />
          </label>
        )}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Back
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white "
          >
            {type == "signin"
              ? submitting
                ? "Signing In"
                : "Sign In"
              : submitting
              ? "Signing Up"
              : "Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
