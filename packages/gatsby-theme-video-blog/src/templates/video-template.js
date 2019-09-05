import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Video from '../components/video';

export const query = graphql`
  query($slug: String) {
    videoEpisode(slug: { eq: $slug }) {
      title
      slug
      date
      description
      body
      youtubeID
      demo
      repo
      links
      guest {
        name
        twitter
      }
      image {
        fluid {
          ...GatsbySanityImageFluid_withWebp
        }
      }
    }
  }
`;

const VideoTemplate = ({ data: { videoEpisode } }) => (
  <Layout>
    <Video {...videoEpisode} />
  </Layout>
);

export default VideoTemplate;
