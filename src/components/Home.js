import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Link to="/pizza">
        <img alt="brick oven pizza" src="https://images.unsplash.com/photo-1536622308015-0740925b8221?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>
      </Link>
    </div>
  );
}