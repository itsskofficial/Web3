import { Footer, Navbar } from "@components/common";
import { Web3Provider } from "@components/providers";
import { Fragment } from "react";

export default function BaseLayout(props) {
    return (
        <Fragment>
            <Web3Provider>
                <div className="relative max-w-7xl mx-auto px-4">
                    <Navbar />
                        <div className="fit">
                            {props.children}
                        </div>
                </div>
                <Footer />
            <Web3Provider>
        </Fragment>
        
    )
}