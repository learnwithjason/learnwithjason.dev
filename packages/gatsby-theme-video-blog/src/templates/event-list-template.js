import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import EventList from '../components/event-list';

export const query = graphql`
  {
    allVideoEpisode(
      sort: { order: DESC, fields: date }
      filter: { isFuture: { eq: true } }
    ) {
      nodes {
        id
        title
        slug
        date
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

const EventListTemplate = ({ data, pageContext: { basePath } }) => (
  <Layout>
    <EventList videos={data.allVideoEpisode.nodes} basePath={basePath} />
  </Layout>
);

export default EventListTemplate;
