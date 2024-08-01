'use client';
import im from '../../images/ecole.jpg'
import FullImageWithText from '../../components/slide/slide';


const GalleryPage = () => {
  return (
    <FullImageWithText
      imageSrc={im}
      text="Primetec Academy. Building a digital future!"
    />
  );
};

export default GalleryPage;
