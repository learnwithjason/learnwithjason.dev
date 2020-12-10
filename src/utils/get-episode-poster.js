export function getEpisodePoster({ teacherImage, title, teacher }) {
  const teacherImageURL = teacherImage + '?w=280&h=280&fit=crop&auto=format';
  function toBase64(str) {
    const encoded =
      typeof btoa === 'function'
        ? btoa(str)
        : Buffer.from(str).toString('base64');

    return encoded.replace(/\//g, '_');
  }

  const poster = [
    'https://res.cloudinary.com/jlengstorf/image/upload',
    '/w_900,h_500,c_fill,q_auto,f_auto',
    `/u_fetch:${toBase64(
      teacherImageURL,
    )},w_280,h_280,c_fill,g_north_west,x_416,y_58`,
    `/w_310,c_fit,co_white,g_north_west,x_40,y_180,l_text:jwf.otf_38_line_spacing_0:${encodeURIComponent(
      encodeURIComponent(title),
    )}`,
    `/l_text:jwf.otf_24_center:${encodeURIComponent(
      teacher,
    )},g_north_west,x_420,y_360,c_fit,co_white,w_280,b_rgb:00000001`,
    '/lwj/video-poster.png',
  ];

  return poster.join('');
}
