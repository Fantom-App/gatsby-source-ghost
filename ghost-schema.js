const types = `
  type GhostPost implements Node {
    slug: String!
    id: ID! 
    uuid: String!
    title: String!
    html: String!
    mobiledoc: String!
    comment_id: String!
    feature_image: String
    featured: Boolean!
    visibility: String!
    created_at: Date! @dateformat
    updated_at: Date! @dateformat
    published_at: Date! @dateformat
    custom_excerpt: String
    codeinjection_head: String
    codeinjection_foot: String
    codeinjection_styles: String
    custom_template: String
    canonical_url: String
    send_email_when_published: Boolean
    tags: [GhostTag] @link(from: "tags.slug" by: "slug")
    primary_tag: GhostTag @link(from: "primary_tag.slug" by: "slug")
    url: String!
    excerpt: String
    reading_time: Int!
    email_subject: String
    plaintext: String
    page: Boolean
    og_image: String
    og_title: String
    og_description: String
    twitter_image: String
    twitter_title: String
    twitter_description: String
    meta_title: String
    meta_description: String
    email_subject: String
    content_type: String!
    duration: String
  }
  
  type GhostPage implements Node {
    slug: String!
    id: ID! 
    uuid: String!
    title: String!
    html: String!
    mobiledoc: String!
    comment_id: String!
    feature_image: String
    featured: Boolean!
    visibility: String!
    created_at: Date! @dateformat
    updated_at: Date! @dateformat
    published_at: Date! @dateformat
    custom_excerpt: String
    codeinjection_head: String
    codeinjection_foot: String
    codeinjection_styles: String
    custom_template: String
    canonical_url: String
    send_email_when_published: Boolean
    tags: [GhostTag] @link(from: "tags.slug" by: "slug")
    primary_tag: GhostTag @link(from: "primary_tag.slug" by: "slug")
    url: String!
    excerpt: String
    reading_time: Int!
    email_subject: String
    plaintext: String
    page: Boolean
    og_image: String
    og_title: String
    og_description: String
    twitter_image: String
    twitter_title: String
    twitter_description: String
    meta_title: String
    meta_description: String
    email_subject: String
  }
  
  type GhostTag implements Node {
    slug: String!
    id: ID! 
    name: String!
    description: String
    feature_image: String
    visibility: String!
    meta_title: String
    meta_description: String
    url: String!
    count: GhostPostCount
    postCount: Int
    type: String!
    featured: Boolean
    featured_description: String
  }

  type GhostSettings implements Node {
    title: String
    description: String
    logo: String
    icon: String
    cover_image: String
    facebook: String
    twitter: String
    lang: String!
    timezone: String!
    meta_title: String
    meta_description: String
    og_image: String
    og_title: String
    og_description: String
    twitter_image: String
    twitter_title: String
    twitter_description: String
    url: String!
    codeinjection_head: String
    codeinjection_foot: String
    codeinjection_styles: String!
  }

  type GhostPostCount {
    posts: Int
}
`;

module.exports = types;
