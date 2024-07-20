import Logo from "./SVG/Logo";
import Facebook from "./SVG/Facebook";
import Twitter from "./SVG/Twitter";
import Insta from "./SVG/Insta";

const Footer = () => {
	const footerMenu = ["Features", "Integrations", "Pricing", "FAQ"];
	const footerSubMenu = ["Privacy", "Terms Of Service"];

	return (
		<footer className="px-4 divide-y bg-[#1a1a1a] text-gray-100">
			<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 lg:items-center">
				<div className="lg:w-1/2">
					<a
						rel="noopener noreferrer"
						href="#"
						aria-label="Token Swap"
						className="flex items-center space-x-3"
					>
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-400">
							<Logo />
						</div>
						<span className="text-2xl font-semibold text-gray-50">
							Token Swap
						</span>
					</a>
				</div>
				<div className="lg:w-1/2 lg:flex lg:justify-end">
					<div className="grid grid-cols-2 text-sm gap-x-8 gap-y-8 lg:w-2/3 sm:grid-cols-4">
						<div className="space-y-3">
							<h3 className="text-xs font-semibold tracking-widest uppercase">
								Product
							</h3>
							<ul className="space-y-3">
								{footerMenu.map((menu, i) => (
									<li key={i}>
										<a
											rel="noopener noreferrer"
											href="#"
											className="text-gray-100"
										>
											{menu}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-3">
							<h3 className="text-xs font-semibold tracking-widest uppercase">
								Company
							</h3>
							<ul className="space-y-3">
								{footerSubMenu.map((menu, i) => (
									<li key={i}>
										<a
											rel="noopener noreferrer"
											href="#"
											className="text-gray-100"
										>
											{menu}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-3">
							<h3 className="text-xs font-semibold tracking-widest uppercase">
								Social Media
							</h3>
							<ul className="space-y-3">
								<li>
									<a
										rel="noopener noreferrer"
										href="#"
										className="text-gray-100"
									>
										<Facebook />
									</a>
								</li>
								<li>
									<a
										rel="noopener noreferrer"
										href="#"
										className="text-gray-100"
									>
										<Twitter />
									</a>
								</li>
								<li>
									<a
										rel="noopener noreferrer"
										href="#"
										className="text-gray-100"
									>
										<Insta />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="py-6 text-sm text-center border-[#7755f3] border-t-[3px] text-gray-400">
				© 2024 itsskofficial All Rights Reserved
			</div>
		</footer>
	);
};

export default Footer;