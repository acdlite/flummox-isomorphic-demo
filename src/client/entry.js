require('../shared/init');

import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import performRouteHandlerStaticMethod from '../shared/performRouteHandlerStaticMethod';

import Flux from '../shared/Flux';

/**
 * On the client, we only need one instance of Flux, created at page load. This
 * actually is, effectively, a singleton, but since the code has to run on both
 * the server and the client, we still need it down to our components as either
 * props or context. We'll use context, in case we have deeply-nested views.
 *
 * TODO: implement dehydration/rehydration
 */
let flux = new Flux();

Router.run(routes, Router.HistoryLocation, (Handler, state) => {

  async function run() {
    /**
     * Like we did on the server, wait for data to be fetched before rendering.
     */
    await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', state, flux);

    /**
     * Pass flux instance as context
     */
    React.withContext(
      { flux },
      () => React.render(<Handler />, document.getElementById('app'))
    );
  }

  /**
   * Don't gobble errors. (This is the worst feature of promises, IMO.)
   */
  run().catch(error => {
    throw error;
  });
});
