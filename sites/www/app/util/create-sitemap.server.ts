const example = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
   <url>
     <loc>http://www.example.com/videos/some_video_landing_page.html</loc>
     <video:video>
       <video:thumbnail_loc>http://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
       <video:title>Grilling steaks for summer</video:title>
       <video:description>Alkis shows you how to get perfectly done steaks every
         time</video:description>
       <video:content_loc>
          http://streamserver.example.com/video123.mp4</video:content_loc>
       <video:player_loc>
         http://www.example.com/videoplayer.php?video=123</video:player_loc>
       <video:duration>600</video:duration>
       <video:expiration_date>2021-11-05T19:20:30+08:00</video:expiration_date>
       <video:rating>4.2</video:rating>
       <video:view_count>12345</video:view_count>
       <video:publication_date>2007-11-05T19:20:30+08:00</video:publication_date>
       <video:family_friendly>yes</video:family_friendly>
       <video:restriction relationship="allow">IE GB US CA</video:restriction>
       <video:price currency="EUR">1.99</video:price>
       <video:requires_subscription>yes</video:requires_subscription>
       <video:uploader
         info="http://www.example.com/users/grillymcgrillerson">GrillyMcGrillerson
       </video:uploader>
       <video:live>no</video:live>
     </video:video>
   </url>
</urlset>
`;

type Video = {
  title?: string;
  description?: string;
  youtubeID?: string;
  publication_date?: string;
};

type SitemapUrl = {
  url: string;
  video?: Video;
};

export function createSitemap(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(({ url, video }) => {
      const loc = `<loc>${url}</loc>`;
      const videoTag = video
        ? `
          <video:video>
            <video:thumbnail_loc>${url}/poster.jpg</video:thumbnail_loc>
            <video:title>${video.title.replace(/&/g, '&amp;')}</video:title>
            <video:description>${video.description.replace(
              /&/g,
              '&amp;',
            )}</video:description>
            <video:player_loc>https://www.youtube.com/embed/${
              video.youtubeID
            }</video:player_loc>
            <video:family_friendly>yes</video:family_friendly>
            <video:requires_subscription>no</video:requires_subscription>
            <video:live>no</video:live>
            <video:uploader info="https://www.learnwithjason.dev">Learn With Jason</video:uploader>
          </video:video>
        `
        : '';

      return `
      <url>
        ${loc}
        ${videoTag}
      </url>
    `;
    })
    .join('');

  return `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urlEntries}
</urlset>
  `;
}
