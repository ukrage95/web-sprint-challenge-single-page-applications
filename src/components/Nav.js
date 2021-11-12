import { Link } from "react-router-dom";
import React from "react";

export default function Nav() {
    return (
        <div className="Nav-container">
            <nav className="Nav-bar">
                <h1>Welcome to Lambda Pizza!</h1>
                <Link to="/">home</Link>
                <Link to="/pizza">Pizza</Link>
            </nav>
        </div>
    )
}