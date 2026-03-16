type CardProps = {
  title: string;
  data: string | number;
  subtext?: string;
};

const Card = ({ title, data, subtext }: CardProps) => {
  return (
    <div className="flex-1 px-5 py-4 bg-background border-1 border-text shadow-sm shadow-text">
      <p className="text-text/50 uppercase ">{title}</p>
      <h3 className="font-bold text-xl truncate pl-px">{data}</h3>
      {subtext && <p className="text-sm text-text/50">{subtext}</p>}
    </div>
  );
};

export default Card;
