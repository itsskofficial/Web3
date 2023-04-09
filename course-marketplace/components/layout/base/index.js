import { Footer, Navbar } from "@components/common";
import { Fragment } from "react";

export default function BaseLayout(props) {
    return (
        <Fragment>
            <div className="relative max-w-7xl mx-auto px-4">
                <Navbar />
                    <div className="fit">
                        {props.children}
                    </div>
                </div>
            <Footer />
        </Fragment>
        
    )
}