const Table = ({history}) => {
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-100 bg-[#7765f3]">
      <h2 className="mb-4 text-2xl font-semibold leading-3">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24"/>
          </colgroup>
          <thead className="bg-[#181818]">
            <tr className="text-left">
              <th className="p-3">
                ID #
              </th>
              <th className="p-3">
                User
              </th>
              <th className="p-3">
                From
              </th>
              <th className="p-3">
                To
              </th>
              <th className="p-3">
                Input
              </th>
              <th className="p-3">
                Output
              </th>
              <th className="p-3">
                Status
              </th>
              </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={i} className="border-b border-opacity-20 border-gray-700 bg-[#27272A]">
                <td className="p-3">
                  {item.id}
                </td>
                <td className="p-3">
                  {item.user}
                </td>
                <td className="p-3">
                  {item.tokenA}
                </td>
                <td className="p-3">
                  {item.tokenB}
                </td>
                <td className="p-3">
                  {item.inputValue}
                </td>
                <td className="p-3">
                  {item.outputValue}
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 font-semibold rounded-md bg-[#7765f3] text-gray-900">
                    <span>
                      Completed
                    </span>
                    </span>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Table;
