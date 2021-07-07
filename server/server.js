import config from './../config/config'
import { sequelize } from '../config/config-db';
import app from './expressClient'

/* app.listen(config.port, () =>
  console.info('Server started on port %s.', config.port),
); */

// Connection URL
const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async() => {
    if (dropDatabaseSync) {
        console.log("Connection established, do nothing")
    }

    app.listen(config.port, () =>
        console.info('Server started on port %s.', config.port),
    );
});

/* const port = process.env.PORT || 3000;
app.listen(port,function (){
    console.log(`server start on ${port}`)
}) */
export default app;