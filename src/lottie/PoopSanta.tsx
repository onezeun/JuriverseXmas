import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

const PoopSanta = () => {
  const [poopsantaAnimationData, setPoopsantaAnimationData] = useState(null);
  const lottiePoopSantaRef = useRef<any>(null); // LottieRef로 애니메이션 제어

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/poopsanta.json'); // JSON 파일의 경로
      const data = await response.json();
      setPoopsantaAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {poopsantaAnimationData && (
        <Lottie
          lottieRef={lottiePoopSantaRef}
          animationData={poopsantaAnimationData}
          loop={false}
          style={{ width: '400px', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default PoopSanta;
