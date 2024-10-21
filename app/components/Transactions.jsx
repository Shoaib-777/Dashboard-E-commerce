
const Transactions = () => {
  return (
    <div className="bg-[var(--bgSoft)] p-5 rounded-lg ">
      <h2 className="mb-5 font-light text-[var(--textSoft)]">Latest Transactions</h2>
      <table className="w-full">
        <thead>
          <tr>
            <td className="p-2">Name</td>
            <td className="p-2">Status</td>
            <td className="p-2">Date</td>
            <td className="p-2">Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">
              <div className="flex gap-2 items-center">
                <img
                  src="/Images/no-user.jpg"
                  alt="no user"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td className="p-2">
              <span className="rounded-md px-2 py-1 text-white text-sm bg-[#f7cb7375]">
                Pending
              </span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">$3,200</td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex gap-2 items-center">
                <img
                  src="/Images/no-user.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td className="p-2">
              <span className="rounded-md px-2 py-1 text-white text-sm bg-[#afd6ee75]">
                Done
              </span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">$3,200</td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex gap-2 items-center">
                <img
                  src="/Images/no-user.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td className="p-2">
              <span className="rounded-md px-2 py-1 text-white text-sm bg-[#f7737375]">
                Cancelled
              </span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">$3,200</td>
          </tr>
          <tr>
            <td className="p-2">
              <div className="flex gap-2 items-center">
                <img
                  src="/Images/no-user.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                John Doe
              </div>
            </td>
            <td className="p-2">
              <span className="rounded-md px-2 py-1 text-white text-sm bg-[#f7cb7375]">
                Pending
              </span>
            </td>
            <td className="p-2">14.02.2024</td>
            <td className="p-2">$3,200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
