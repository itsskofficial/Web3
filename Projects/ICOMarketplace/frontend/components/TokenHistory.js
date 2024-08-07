import { useEffect } from "react";
import toast from "react-hot-toast";

const TokenHistory = ({ shortenAddress, setOpenTokenHistory }) => {
  
  const notifySuccess = (msg) => toast.success(msg, { duration: 200 })
  const notifyError = (msg) => toast.error(msg, { duration: 200 })

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    notifySuccess("Copied successfully")
  }

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, [])


  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenTokenHistory(false)} className="close">&times;</span>
        <h2>
          Token History
        </h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Supply</th>
                <th>Address</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {
                history.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => copy(item.logo)}>
                      <img src={item.logo} style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>{item.supply}</td>
                    <td onClick={() => copy(item.address)}>{shortenAddress(item.address)}</td>
                    <td>{item.hash}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default TokenHistory;