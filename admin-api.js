const GhostAdminApi = require("@tryghost/admin-api");

module.exports.configure = ({ apiUrl, adminApiKey, version = `v3` }) => {
  return new GhostAdminApi({
    url: apiUrl,
    key: adminApiKey,
    version: version
  });
};
