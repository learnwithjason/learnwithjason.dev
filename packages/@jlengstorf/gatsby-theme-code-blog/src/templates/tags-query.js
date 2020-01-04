import { graphql } from 'gatsby';
import PostsPage from 'gatsby-theme-blog-core/src/components/posts';

export default PostsPage;

export const query = graphql`
  query TagsPageQuery($tag: [String]) {
    allBlogPost(
      sort: { fields: [date, title], order: DESC }
      filter: { tags: { in: $tag } }
      limit: 1000
    ) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`;
