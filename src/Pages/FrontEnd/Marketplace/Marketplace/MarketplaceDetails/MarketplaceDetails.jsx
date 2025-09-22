import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillBookmarkFill, BsThreeDots } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";

const MarketplaceDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("Is this still available?");

  const suggestions = [
    "Is this still available?",
    "Can I schedule a time to see this over Messenger video call?",
    "What's the vehicle's history?",
    "How many people owned this previously?",
  ];

  const item = {
    id,
    title: "2020 Subaru Outback",
    price: "$27,000",
    location: "Palo Alto, CA",
    description: `2020 Outback Limited\nTransferable extended warranty from Subaru, good for 7 years and 80,000 miles.`,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
    seller: "Kyle Wyatt",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-8 bg-gray-100 min-h-screen mt-10">
      {/* Left: Main Image */}
      <div className="w-full lg:w-2/3 bg-white rounded shadow">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[550px] object-cover rounded"
        />
      </div>

      {/* Right: Details */}
      <div className="w-full lg:w-1/3 bg-white rounded shadow p-4 flex flex-col gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-xl">{item.price}</p>
          <p className="text-sm text-gray-500">Listed in {item.location}</p>
        </div>

        {/* Icons Row */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Message
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <BsFillBookmarkFill className="text-xl text-gray-700" />
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <IoMdShare className="text-xl text-gray-700" />
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <BsThreeDots className="text-xl text-gray-700" />
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-4">Sellers description</h2>
          <p className="whitespace-pre-line text-sm text-gray-700 mt-1">
            {item.description}
          </p>
        </div>

        <div>
          {/* <img
            src="https://via.placeholder.com/300x150?text=Map+Preview"
            alt="Map"
            className="rounded w-full mt-2"
          /> */}
          <p className="text-sm text-blue-600 mt-1">
            Palo Alto, California · Location is approximate
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mt-4">Send seller a message</label>
          <textarea
            rows="3"
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none mt-1"
            placeholder="Hello, is this still available?"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded mt-2 hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">
                Message {item.seller}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.price}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {suggestions.map((sugg, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(sugg)}
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded"
                >
                  {sugg}
                </button>
              ))}
            </div>

            <textarea
              rows="3"
              className="w-full p-2 border rounded text-sm resize-none"
              placeholder="Type your message to the seller"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <p className="text-xs text-gray-500 mt-2">
              Dont share your email address, phone number or financial information.
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-blue-600 hover:underline text-sm"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceDetails;
