'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

let AppHandler = React.createClass({

  render() {
    return (
      <div>
        <header>
          <h1>Isomorphic Flummox App</h1>
          <p>
            This is an simple app demonstrating how to use Flummox and
            react-router to create isomorphic React applications.
          </p>
          <p>
            It's a work in progress. Right now, it shows the first 50 stargazers
            for a given GitHub repo. Pretty bare-bones, as you can see, but it
            gets the basic idea across.
          </p>
          <p>
            Check out the page source to see that HTML is being rendered on the
            server.
          </p>
        </header>
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  },

});

export default AppHandler;
