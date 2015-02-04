'use strict';

import React from 'react';
import Immutable from 'immutable';

let StargazerGridView = React.createClass({

  getDefaultProps() {
    return {
      stargazers: Immutable.List(),
    };
  },

  render() {
    let items = this.props.stargazers
      .toArray()
      .map(stargazer => <StargazerItem stargazer={stargazer} />);

    return (
      <div>
        {items}
      </div>
    );
  },

});

let StargazerItem = React.createClass({

  render() {
    let { stargazer } = this.props;

    return (
      <article>
        <h1>
          <a href={stargazer.get('url')}>
            <img src={stargazer.get('avatar_url')} height="50" width="50" />
            {stargazer.get('login')}
          </a>
        </h1>
      </article>
    );
  },

});

export default StargazerGridView;
