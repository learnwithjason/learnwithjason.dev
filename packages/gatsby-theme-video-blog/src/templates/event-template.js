import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Event from '../components/event';

export const query = graphql`
  query($pageID: String!) {
    videoEpisode(id: { eq: $pageID }) {
      title
      slug
      date
      guest {
        name
        twitter
      }
      image {
        fluid {
          ...GatsbySanityImageFluid_withWebp
        }
      }
      description
    }
  }
`;

const EventTemplate = ({ data, pageContext: { basePath } }) => (
  <Layout>
    <Event {...data.videoEpisode} basePath={basePath} />
  </Layout>
);

export default EventTemplate;
