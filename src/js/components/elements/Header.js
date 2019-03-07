import React from "react";

import Authentication from "./Authentication";
import { Link } from "react-router-dom";
import { isUserAuthenticated } from '../../utils/authentication.utils';

export default function Header() {

  return (
    <div class="header">
      <Link to="/">
        <div id="logo" />
      </Link>
      {isUserAuthenticated() && (<Authentication />)}
    </div>
  );
}
