import gsap from 'gsap';
import { useEffect } from 'preact/hooks';

export function useGradientHover(ref) {
  useEffect(() => {
    const icon = ref.current;
    const onPath = icon.querySelector('.on');
    const offPath = icon.querySelector('.off');

    const fromConfig = { scale: 0.75, ease: 'back' };

    const toConfig = {
      duration: 0.2,
      rotation: 4,
      scale: 0.9,
      paused: true,
      ease: 'back',
    };

    const onAnimation = gsap.fromTo(
      onPath,
      { ...fromConfig, opacity: 0 },
      {
        ...toConfig,
        opacity: 1,
      },
    );

    const offAnimation = gsap.fromTo(
      offPath,
      { ...fromConfig, opacity: 1 },
      {
        ...toConfig,
        opacity: 0,
      },
    );

    const enter = () => {
      onAnimation.play();
      offAnimation.play();
    };

    const leave = () => {
      onAnimation.reverse();
      offAnimation.reverse();
    };

    icon.addEventListener('mouseenter', enter);
    icon.addEventListener('mouseleave', leave);

    onAnimation.seek(0);
    offAnimation.seek(0);

    return () => {
      icon.removeEventListener('mouseenter', enter);
      icon.removeEventListener('mouseleave', leave);
    };
  }, [ref]);
}
