// components/FullImageWithText.js
import Image from 'next/image';

const FullImageWithText = ({ imageSrc, text }) => {
  return (
    <div className="relative h-screen">
      <Image
        src={imageSrc}
        alt="Description de l'image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50">
        <h1 className="text-white text-center text-4xl font-bold">{text}</h1>
      </div>
    </div>
  );
};

export default FullImageWithText;
