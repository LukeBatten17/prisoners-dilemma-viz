type CardProps = {
  title: string;
  data: string | number;
  subtext?: string;
};

const Card = ({ title, data, subtext }: CardProps) => {
  return (
    <div className="px-5 py-4 bg-background border-1 border-text">
      <p className="text-text/50 uppercase">{title}</p>
      <h3 className="font-bold text-xl">{data}</h3>
      {subtext && <p>{subtext}</p>}
    </div>
  );
};

export default Card;
