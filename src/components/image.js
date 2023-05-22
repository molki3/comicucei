import { Image } from 'cloudinary-react';
import cloudinaryConfig from '../../cloudinary.config';

const CloudinaryImage = ({ publicId }) => {
  return (
    <Image
      cloudName={cloudinaryConfig.cloudName}
      publicId={publicId}
      width="300"
      crop="scale"
      alt="Product Image"
    />
  );
};

export default CloudinaryImage;