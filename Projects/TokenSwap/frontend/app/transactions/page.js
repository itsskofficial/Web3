import Footer from "@components/Footer"
import Header from "@components/Header"
import Table from "@components/Table"
import { getTransactionHistory } from "@utils/context"
import { useEffect, useState } from "react"

const Tokens = () => {
    const [history, setHistory] = useState([])
    const loadData = async () => {
        const data = await getTransactionHistory()
        setHistory(data.reverse())
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="bg-[#1a1a1a]">
            <Header />
            <div className="p-[80px]">
               <Table history={history} /> 
            </div>
            <Footer />
        </div>
    )
}