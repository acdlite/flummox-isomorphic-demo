require('../shared/init');

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config.dev';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
})
  .listen(8080, 'localhost', function (err, result) {
    if (err) console.log(err);

    console.log('Dev server listening at localhost:8080');
  });
