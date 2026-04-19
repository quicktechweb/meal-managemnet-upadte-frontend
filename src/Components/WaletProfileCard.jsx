import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const WalletProfileCard = () => {
  return (
    <div className=" mt-4 mx-auto px-3 mb-4">
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden rounded-3xl bg-white p-6  text-black shadow">
        <div className="absolute -top-16 -right-16 w-46 h-46 bg-black/10 rounded-full" />
        <div className="absolute bottom-0 right-20 w-30 h-30 bg-black/5 rounded-full" />

        {/* Left: Wallet Info */}
        <div className="flex flex-col lg:flex-row  items-start lg:items-center gap-3 md:gap-6 z-10">
          <div className="bg-black/20 p-2.5 md:p-5 rounded-2xl">
            <Wallet className="size-5 md:size-10" />
          </div>

          <div>
            <p className="text-sm opacity-80">My Wallet</p>
            <h2 className=" text-2xl md:text-4xl font-bold mt-1">৳ 5,350</h2>
            <p className="text-sm opacity-70 mt-1">Available Balance</p>
            <Link
              to={"/dashboard/wallet-management"}
              className="underline text-xs"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Right: Profile Details */}
        <div className="text-left sm:text-right flex flex-col items-end sm:justify-end z-10 ">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
              alt="profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
            />
          </div>

          <div>
            <p className="text-base md:text-lg font-semibold">Quick Tech</p>
          </div>

          <div>
            <p className="text-xs opacity-70">Wallet ID</p>
            <p className="text-xs sm:text-sm font-medium tracking-wider">
              Id-90231
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletProfileCard;
