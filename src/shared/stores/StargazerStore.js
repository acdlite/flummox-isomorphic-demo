import { Store } from 'flummox';
import Immutable from 'immutable';

export default class StargazersStore extends Store {

  constructor(flux) {
    super();

    let stargazerActionIds = flux.getActionIds('stargazers');

    this.register(stargazerActionIds.getStargazersByRepo, this.handleGetStargazersByRepo);

    this.state = {
      stargazers: Immutable.Map(),
      stargazersByRepo: Immutable.Map(),
    };
  }

  handleGetStargazersByRepo({ owner, repo, stargazers }) {
    let key = repoKey(owner, repo);

    stargazers = Immutable.fromJS(stargazers);

    let stargazersMap = stargazers.reduce((result, stargazer) => {
      result = result.set(stargazer.get('id'), stargazer);
      return result;
    }, Immutable.Map());

    this.setState({
      stargazersByRepo: this.state.stargazersByRepo.set(key, stargazers),
      stargazers: this.state.stargazers.merge(stargazersMap),
    });
  }

  getStargazersByRepo(owner, repo) {
    let key = repoKey(owner, repo);
    return this.state.stargazersByRepo.get(key);
  }

}

function repoKey(owner, repo) {
  return `${owner}/${repo}`;
}
