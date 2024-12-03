import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const Title = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch('/lottie/title_01.json'); // JSON 파일의 경로
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="flex h-[100dvh] w-full justify-center">
      <Lottie animationData={animationData} loop={false} />
    </div>
  );
};

export default Title;
