import React from "react";

const RoomListUser = ({
  setRoomSearch,
  selectedRoom,
  roomNumberList,
  handleRoomSelect,
  searchedRoomStudents,
  instituteUsers,
  roomSearch,
  selectedUser,
  setSelectedUser,
  avatarColors,
  getInitials,
}) => {
  return (
    <div className="mb-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Filter by Room
        </p>
        <select
          value={selectedRoom}
          onChange={(e) => {
            handleRoomSelect(e);
            setRoomSearch("");
          }}
          className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
        >
          <option value="">All Rooms</option>
          {roomNumberList?.map((room) => (
            <option key={room} value={room}>
              Room {room} —{" "}
              {
                instituteUsers?.filter(
                  (user) => user?.information?.room_number === room,
                ).length
              }{" "}
              Students
            </option>
          ))}
        </select>

        {selectedRoom && (
          <input
            type="text"
            placeholder="Search by name, email or UID..."
            value={roomSearch}
            onChange={(e) => setRoomSearch(e.target.value)}
            className="w-full mt-3 text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        )}
      </div>

      {selectedRoom && (
        <ul className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
          {searchedRoomStudents?.length > 0 ? (
            searchedRoomStudents.map((student, i) => {
              const fullName = student.information?.full_name ?? "Unknown";
              const isSelected = selectedUser?._id === student._id;

              return (
                <li
                  key={student._id}
                  onClick={() => {
                    setSelectedUser(student);
                    setSuccess(false);
                    reset();
                  }}
                  className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-violet-50 border-l-4 border-violet-500"
                      : "hover:bg-slate-50 border-l-4 border-transparent"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      avatarColors[i % avatarColors.length]
                    }`}
                  >
                    {getInitials(fullName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-800 truncate capitalize">
                        {fullName}
                      </p>
                      <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                        #{student.uid}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {student.email}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-slate-700">
                      Room {student.information?.room_number}
                    </p>
                    <p className="text-xs text-slate-400">
                      {student.information?.designation ?? "—"}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="px-5 py-8 text-center text-sm text-slate-400">
              {roomSearch
                ? `"${roomSearch}" — কোনো student পাওয়া যায়নি`
                : "No students found in this room"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default RoomListUser;
