import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-black  text-2xl font-bold text-center p-5 flex items-center justify-center text-amber-300 ">
      <Link to="/">
        <img src="Pokemon.png" alt="Pokemon" className="h-[50px] " />
      </Link>
    </header>
  );
};
