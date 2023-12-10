import Image from "next/image";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        width="30"
        height="30"
        className="rounded-full"
      />
    );
  }
  return <FaUser size={22} />;
};

export default Avatar;
