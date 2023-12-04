"use client";
interface HeadingProps {
  text: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({ text, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h1 className="text-2xl font-bold">{text}</h1>
    </div>
  );
};

export default Heading;
