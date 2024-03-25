import "@styles/global.css";

export const metadata = {
  title: "talkcreek",
  description: "Explore and Share talks about your favourite topics",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
