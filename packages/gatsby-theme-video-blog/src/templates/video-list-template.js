import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import VideoList from '../components/video-list';
import IntroBlock from '../components/intro-block.mdx';

export const query = graphql`
  {
    allVideoEpisode(
      sort: { order: DESC, fields: date }
      filter: {
        youtubeID: { ne: null }
        isFuture: { eq: false }
        hidden: { eq: false }
      }
    ) {
      nodes {
        id
        title
        slug
        guest {
          name
          twitter
        }
        description
        image {
          fluid {
            ...GatsbySanityImageFluid_withWebp
          }
        }
      }
    }
  }
`;

const VideoListTemplate = ({ data, pageContext: { basePath } }) => (
  <Layout>
    <IntroBlock />
    <VideoList videos={data.allVideoEpisode.nodes} basePath={basePath} />
  </Layout>
);

export default VideoListTemplate;
