import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

const Santa = () => {
  const [animationData, setAnimationData] = useState(null);
  const lottieSantaRef = useRef<any>(null); // LottieRef로 애니메이션 제어

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/santa.json'); // JSON 파일의 경로
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      {animationData && (
        <Lottie
          lottieRef={lottieSantaRef}
          animationData={animationData}
          loop={false}
          style={{ width: '200px', height: '200px' }}
        />
      )}
    </div>
  );
};

export default Santa;
