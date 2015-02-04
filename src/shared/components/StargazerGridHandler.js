'use strict';

import React from 'react';
import { State } from 'react-router';
import Immutable from 'immutable';

import StargazerGridView from './StargazerGridView';

let StargazerGrid = React.createClass({

  mixins: [State],

  statics: {
    async routerWillRun(state, flux) {
      let { owner, repo } = state.params;
      let stargazerActions = flux.getActions('stargazers');

      return await stargazerActions.getStargazersByRepo(owner, repo);
    }
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    this.stargazerStore = this.context.flux.getStore('stargazers');

    let { owner, repo } = this.getParams();

    return {
      stargazers: this.stargazerStore.getStargazersByRepo(owner, repo),
    };
  },

  componentDidMount() {
    this.stargazerStore.addListener('change', this.onStargazerStoreChange);
  },
  
  componentWillUnmount() {
    this.stargazerStore.removeListener('change', this.onStargazerStoreChange);
  },

  onStargazerStoreChange() {
    let { owner, repo } = this.getParams();

    this.setState({
      stargazers: this.stargazerStore.getStargazersByRepo(owner, repo),
    });
  },

  render() {
    let { stargazers } = this.state;
    let { owner, repo } = this.getParams();

    if (!Immutable.List.isList(stargazers)) return 'No stargazers found';

    return (
      <StargazerGridView
        stargazers={stargazers}
        owner={owner}
        repo={repo}
      />
    );
  }

});

export default StargazerGrid;
