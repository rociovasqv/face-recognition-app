import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  //Un pequeño ejemplo, hay que seguir desarrollando, usar <Link> </Link> para urls
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;