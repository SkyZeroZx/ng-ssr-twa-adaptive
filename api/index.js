const path = require("path");

const serverDistPath = path.join(
  process.cwd(),
  "dist/ng-twa/server/server.mjs"
);

export default import(serverDistPath).then((module) => module.app);
