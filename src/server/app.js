// Initialization
require('../shared/init');
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

// Create koa app
import koa from 'koa';
let app = koa();
export default app;

// Middleware
import routes from './routes';
routes(app);

// Start listening
let port = process.env.PORT || 3000;
app.listen(port);
console.log(`App started listening on port ${port}`);
