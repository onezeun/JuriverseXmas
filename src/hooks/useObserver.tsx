import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useObserver = () => {
  const animation = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true, // 요소가 보일 때 한 번만 애니메이션 실행
    threshold: 0.1, // 요소가 10% 보이면 애니메이션 시작
  });

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);

  return { ref, animation };
};

export default useObserver;
