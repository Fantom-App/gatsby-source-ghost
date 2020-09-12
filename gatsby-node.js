const Promise = require("bluebird");
const ContentAPI = require("./content-api");
const AdminAPI = require("./admin-api");

const {
  PostNode,
  PageNode,
  TagNode,
  SettingsNode
} = require("./ghost-nodes");

const _ = require(`lodash`);
const cheerio = require(`cheerio`);

const ghostTypes = require('./ghost-schema');

const parseCodeinjection = html => {
  let $ = null;

  try {
    $ = cheerio.load(html, { decodeEntities: false });
  } catch (e) {
    return {};
  }

  const $parsedStyles = $(`style`);
  const codeInjObj = {};

  $parsedStyles.each((i, style) => {
    if (i === 0) {
      codeInjObj.styles = $(style).html();
    } else {
      codeInjObj.styles += $(style).html();
    }
  });

  return codeInjObj;
};

const transformCodeinjection = posts => {
  posts.map(post => {
    const allCodeinjections = [
      post.codeinjection_head,
      post.codeinjection_foot
    ].join("");

    if (!allCodeinjections) {
      return post;
    }

    const headInjection = parseCodeinjection(allCodeinjections);

    if (_.isEmpty(post.codeinjection_styles)) {
      post.codeinjection_styles = headInjection.styles;
    } else {
      post.codeinjection_styles += headInjection.styles;
    }

    post.codeinjection_styles = _.isNil(post.codeinjection_styles)
      ? ""
      : post.codeinjection_styles;

    return post;
  });

  return posts;
};

/**
 * Create Live Ghost Nodes
 * Uses the Ghost Content API to fetch all posts, pages, tags and settings
 * Creates nodes for each record, so that they are all available to Gatsby
 */
exports.sourceNodes = ({ actions }, configOptions) => {
  const { createNode } = actions;

  const content_api = ContentAPI.configure(configOptions);
  const admin_api = AdminAPI.configure(configOptions);

  const postFetchOptions = {
    limit: "all",
    include: "tags",
    formats: "html,plaintext,mobiledoc",
    order: "published_at DESC",
    filter: "status:published"
  };

  const pageFetchOptions = {
    limit: "all",
    formats: "html",
    filter: "status:published"
  };

  const fetchPosts = admin_api.posts.browse(postFetchOptions).then(posts => {
    posts = transformCodeinjection(posts);
    posts.forEach(post => createNode(PostNode(post)));
  });

  const fetchPages = admin_api.pages.browse(pageFetchOptions).then(pages => {
    pages.forEach(page => createNode(PageNode(page)));
  });

  const tagFetchOptions = {
    limit: "all",
    include: "count.posts"
  };

  const fetchTags = admin_api.tags.browse(tagFetchOptions).then(tags => {
    tags.forEach(tag => {
      tag.postCount = tag.count.posts;
      createNode(TagNode(tag));
    });
  });

  const fetchSettings = content_api.settings.browse().then(setting => {
    const codeinjectionHead = setting.codeinjection_head || setting.ghost_head;
    const codeinjectionFoot = setting.codeinjection_foot || setting.ghost_foot;
    const allCodeinjections = codeinjectionHead
      ? codeinjectionHead.concat(codeinjectionFoot)
      : codeinjectionFoot
      ? codeinjectionFoot
      : null;

    if (allCodeinjections) {
      const parsedCodeinjections = parseCodeinjection(allCodeinjections);

      if (_.isEmpty(setting.codeinjection_styles)) {
        setting.codeinjection_styles = parsedCodeinjections.styles;
      } else {
        setting.codeinjection_styles += parsedCodeinjections.styles;
      }
    }

    setting.codeinjection_styles = _.isNil(setting.codeinjection_styles)
      ? ""
      : setting.codeinjection_styles;
    // The settings object doesn't have an id, prevent Gatsby from getting 'undefined'
    setting.id = 1;
    createNode(SettingsNode(setting));
  });

  return Promise.all([fetchPosts, fetchPages, fetchTags, fetchSettings]);
};

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions;
  createTypes(ghostTypes);
};
