const createNodeHelpers = require("gatsby-node-helpers").default;
const schema = require("./ghost-schema");

const { createNodeFactory } = createNodeHelpers({
  typePrefix: "Ghost"
});

const POST = "Post";
const PAGE = "Page";
const TAG = "Tag";
const SETTINGS = "Settings";

const PostNode = createNodeFactory(POST);
const PageNode = createNodeFactory(PAGE);
const TagNode = createNodeFactory(TAG);
const SettingsNode = createNodeFactory(SETTINGS);

const fakeNodes = [
  PostNode(schema.post),
  PageNode(schema.page),
  TagNode(schema.tag),
  SettingsNode(schema.settings)
];

module.exports = {
  PostNode,
  PageNode,
  TagNode,
  SettingsNode,
  fakeNodes
};
