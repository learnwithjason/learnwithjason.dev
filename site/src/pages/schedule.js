import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Events from '../components/events';

const Upcoming = () => {
  const data = useStaticQuery(graphql`
    {
      allEvent(sort: { order: ASC, fields: start }) {
        nodes {
          id
          originalID
          title
          description
          start
          image {
            sharp: childImageSharp {
              fluid(traceSVG: { color: "#F3D2E9", background: "#F9E7F3" }) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  `);

  const futureEvents = data.allEvent.nodes.filter(
    event => new Date(event.start) >= new Date(),
  );

  return (
    <Layout>
      <Helmet>
        <title>Upcoming Episodes</title>
      </Helmet>
      <Events events={futureEvents} />
    </Layout>
  );
};

export default Upcoming;
