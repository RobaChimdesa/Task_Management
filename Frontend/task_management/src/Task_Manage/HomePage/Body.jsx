import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="my-24  p-6 md:p-10 max-w-screen-lg mx-auto text-center font-serif space-y-6">
      <h4 className="text-xl md:text-2xl  text-gray-600 leading-tight">
      A task management system or website is a digital tool designed to
       help individuals and teams organize, prioritize, and track
        their tasks and projects efficiently. These platforms
         provide a range of features that enhance productivity
          and collaboration, making it easier to manage workloads and deadlines.
      </h4>
      {/* <h3 className="text-lg md:text-2xl text-gray-600 leading-relaxed">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus dolores distinctio ullam,
        sapiente similique inventore porro unde vero quaerat quas explicabo assumenda iusto ipsam
        ipsa ea quod odio adipisci laborum.
      </h3> */}
      <Link
        to="/signup"
        className="inline-block bg-slate-300 text-black px-6 py-3 rounded-full hover:bg-slate-600 hover:text-white transition-all"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Body;
