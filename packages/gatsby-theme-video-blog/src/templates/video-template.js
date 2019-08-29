import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Video from '../components/video';

// export const query = graphql`
//   query($video: String) {
//     video(id: { eq: $video }) {
//       title
//       details {
//         body
//         frontmatter {
//           guest {
//             name
//             twitter
//           }
//         }
//       }
//       embed
//       image {
//         local {
//           sharp: childImageSharp {
//             fluid {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const VideoTemplate = ({ data: { video } }) => {
  const props = {
    title: video.title,
    guest: video.details ? video.details.frontmatter.guest : [],
    body: video.details ? video.details.body : null,
    embed: video.embed,
    image: video.image.local.sharp.fluid,
  };

  return (
    <Layout>
      <Video {...props} />
    </Layout>
  );
};

export default VideoTemplate;
