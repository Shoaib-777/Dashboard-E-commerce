
const Card = ({ item }) => {
  return (
    <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-gray-700 border border-black ">
      {item.icon}
      <div className="flex flex-col gap-5">
        <span className="text-lg font-medium">{item.title}</span>
        <span className="text-2xl font-medium">{item.number}</span>
        <span className="text-sm font-light">
          <span className={item.change > 0 ? "text-lime-500" : "text-red-500"}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
