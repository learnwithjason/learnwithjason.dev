import React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/layout';
import VideoList from '../components/video-list';

// export const query = graphql`
//   {
//     allVideo {
//       nodes {
//         id
//         videoID
//         title
//         details {
//           frontmatter {
//             guest {
//               name
//             }
//           }
//         }
//         description
//         image {
//           local {
//             sharp: childImageSharp {
//               fluid {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const VideoListTemplate = ({ data }) => {
  // const videoList = data.allVideo.nodes.map(video => ({
  //   id: video.id,
  //   videoID: video.videoID,
  //   title: video.title,
  //   description: video.description,
  //   image: video.image.local.sharp.fluid,
  //   guest: video.details
  //     ? video.details.frontmatter.guest.map(({ name }) => name)
  //     : [],
  // }));

  return (
    <Layout>
      {/* <VideoList videos={videoList} /> */}
      <VideoList videos={[]} />
    </Layout>
  );
};

export default VideoListTemplate;
