import SingleCard from "./SingleCard";
import { useAccount } from "wagmi";

const Card = () => {
  const { address } = useAccount()
  
  return (
		<section className="py-6 sm:py-12 bg-[#1a1a1a] text-gray-100">
			<div className="container mx-auto p-6 space-y-8">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold">All Tokens For Sale</h2>
					<p className="font-serif text-sm text-gray-400">
						Select a token to get started
					</p>
				</div>
				<div className="grid gird-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
					{Object.keys(TOKENS).map((name, index) => (
						<SingleCard
							key={index}
							index={index}
							name={name}
							walletAddress={address}
						/>
					))}
				</div>
			</div>
		</section>
  );
};

export default Card;
