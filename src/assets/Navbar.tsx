import { Link } from "react-router";
import logo from "/pullframe-logo.png";

export const Navbar = () => {
  return (
    <nav className="absolute inset-0 top-2 z-1 ">
      <div className=" w-container mt-10 mx-10 ">
        <div className=" rounded-2xl max-w-[100%] items-center justify-between flex backdrop-blur-3xl bg-opacity700 border-2 border-primary drop-shadow-lg">
          {/* This is the logo  */}

          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse pr-24 pl-24 pt-0 pb-0"
          >
            <img src={logo} className="h-24" alt="Flowbite Logo" />
          </Link>

          <ul className="relative flex h-16 items-center justify-end pl-24 pr-24 ">
            {/* This is the links */}
            <li className="font-display pr-10">
              <Link to="/">Home</Link>
            </li>
            <li className="font-display pr-10">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li className="font-display pr-10">
              <Link to="/roadmap">Roadmap</Link>
            </li>
            <li className="font-display pr-10">
              <a href="/contact">ContactUs</a>
            </li>
            <li className="pr-10">
              <div className="bg-primary rounded-4xl font-display font-extrabold text-white p-3 pr-5 pl-5">
                <Link to="/signup">Get Started</Link>
              </div>
            </li>
            <li>
              <div className="bg-primary rounded-4xl font-display font-extrabold text-white p-3 pr-5 pl-5">
                <Link to="/login">Login</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
