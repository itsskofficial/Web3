import { Fragment } from "react";

export default function BaseLayout(props) {
    return (
        <Fragment>
            <div className="relative max-w-7xl mx-auto px-4">
                <Navbar />
                    <div className="fit">
                    </div>
                </div>
            <Footer />
        </Fragment>
        
    )
}