import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const WalletProfileCard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative flex items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white shadow-2xl">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full" />
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full" />

        {/* Left: Wallet Info */}
        <div className="flex items-center gap-6 z-10">
          <div className="bg-white/20 p-5 rounded-2xl">
            <Wallet size={34} />
          </div>

          <div>
            <p className="text-sm opacity-80">My Wallet</p>
            <h2 className="text-4xl font-bold mt-1">৳ 5,350</h2>
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
        <div className="text-right flex flex-col items-end justify-end z-10 space-y-2">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
          </div>

          <div>
            <p className="text-lg font-semibold">Naymur Rahman</p>
          </div>

          <div>
            <p className="text-xs opacity-70">Wallet ID</p>
            <p className="text-sm font-medium tracking-wider">WL-90231</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletProfileCard;
