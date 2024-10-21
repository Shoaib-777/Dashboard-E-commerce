import { MdSupervisedUserCircle } from "react-icons/md";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Transactions from "../components/Transactions";
import { FaBoxOpen } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";


export const dynamic = 'force-dynamic';

const Dashboard = () => {
  const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10.928,
      change: 12,
      icon: <MdSupervisedUserCircle size={24} />      ,
    },
    {
      id: 2,
      title: "Stock",
      number: 8.236,
      change: -2,
      icon: <FaBoxOpen size={24} />
    },
    {
      id: 3,
      title: "Revenue",
      number: 6.642,
      change: 18,
      icon : <FaMoneyBillTrendUp size={24}/>
    },
  ];
  return (
    <div className="flex gap-5 mt-5 h-[calc(100vh-78px)] mb-1 overflow-y-auto bg-gray-300">
      <div className="flex flex-col gap-5 flex-[3] ">
        <div className="flex justify-between gap-5 border-b-2 border-white py-2 px-1 rounded-md">
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
