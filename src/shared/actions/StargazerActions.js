'use strict';

import { Actions } from 'flummox';
import request from 'superagent';

export default class StargazerActions extends Actions {

  async getStargazersByRepo(owner, repo) {
    let response = await request
      .get(`https://api.github.com/repos/${owner}/${repo}/stargazers`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      owner,
      repo,
      stargazers: response.body,
    };
  }

}
