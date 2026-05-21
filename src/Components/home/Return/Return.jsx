import { RefreshCcw, PackageCheck, Clock, AlertCircle } from "lucide-react";

const ReturnPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Return & Refund Policy
        </h1>
        <p className="text-gray-500 mt-2">
          Easy, fast and hassle-free returns within a few simple steps
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <RefreshCcw className="text-blue-500" />
          <h3 className="font-semibold mt-3">Easy Returns</h3>
          <p className="text-sm text-gray-500 mt-1">
            Return products in just a few clicks
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <Clock className="text-green-500" />
          <h3 className="font-semibold mt-3">7–14 Days</h3>
          <p className="text-sm text-gray-500 mt-1">
            Return window depending on product type
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <PackageCheck className="text-purple-500" />
          <h3 className="font-semibold mt-3">Quick Approval</h3>
          <p className="text-sm text-gray-500 mt-1">
            Fast verification and approval process
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <AlertCircle className="text-red-500" />
          <h3 className="font-semibold mt-3">Conditions Apply</h3>
          <p className="text-sm text-gray-500 mt-1">
            Item must be unused and in original condition
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          How to Return a Product
        </h2>

        <div className="space-y-6">
          
          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
              1
            </span>
            <div>
              <h3 className="font-semibold">Request a Return</h3>
              <p className="text-gray-500 text-sm">
                Go to your order page and click on “Return Item”.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold">Pick-up / Drop-off</h3>
              <p className="text-gray-500 text-sm">
                Our delivery partner will collect the item from your address.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold">Refund Processed</h3>
              <p className="text-gray-500 text-sm">
                Refund will be credited within 3–5 business days after approval.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReturnPage;