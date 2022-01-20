import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const inactivePath =
  'M42 0 C19 0, 0 19, 0 42 C0 65, 18 84, 42 84 C65 84, 84 65, 84 42 C84 19, 65 0, 42 0 M42 2 C20 2, 2 20, 2 42 C2 64, 20 82, 42 82 C64 82, 82 64, 82 42 C82 20, 64 2, 42 2';
const activePath =
  'M42 0 C19 0, 0 19, 0 42 C0 65, 18 84, 42 100 C65 84, 84 65, 84 42 C84 19, 65 0, 42 0 M42 2 C20 2, 2 20, 2 42 C2 64, 20 82, 42 82 C64 82, 82 64, 82 42 C82 20, 64 2, 42 2';

export function TeacherPhoto({
  imageURL = 'https://github.com/jlengstorf.png',
  alt,
  width = 150,
  active = false,
  animate = false,
  skipFetch = false,
}) {
  const ref = useRef();

  const url = skipFetch
    ? imageURL
    : `https://res.cloudinary.com/jlengstorf/image/fetch/w_${width * 2},h_${
        width * 2
      },c_fill,g_face,q_auto,f_auto/${imageURL}`;

  useEffect(() => {
    if (!animate) {
      return;
    }

    const photo = ref.current;
    const border = photo.querySelector('.border');
    const config = { duration: 0.4, ease: 'back.inOut(2)' };

    if (active) {
      gsap.to(photo, {
        ...config,
        ease: 'back.out(2)',
        scale: 1,
      });

      gsap.to(border, {
        ...config,
        ease: 'back.out(2)',
        attr: {
          d: activePath,
        },
      });
    } else {
      gsap.to(photo, {
        ...config,
        scale: 0.8,
        zIndex: 10,
      });

      gsap.to(border, {
        ...config,
        attr: {
          d: inactivePath,
        },
      });
    }
  }, [active]);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 84 110"
    >
      <title>{alt}</title>
      <defs>
        <circle id="photo-area" cx="42" cy="42" r="38" />
      </defs>
      <clipPath id="photo">
        <use href="#photo-area" fill="black" />
      </clipPath>

      <path
        class="border"
        fill="url(#lwj-gradient)"
        fillRule="evenodd"
        d={inactivePath}
        clipRule="evenodd"
      />
      <use href="#photo-area" stroke="white" strokeWidth="4" />
      <image clipPath="url(#photo)" href={url} width="100%" />
    </svg>
  );
}
