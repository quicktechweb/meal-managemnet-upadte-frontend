// Institute er member (role: "user") er nijer profile page.
// Data ashe /api/instituteuser theke -> me.information (+ email, phone, uid, balance ...)
import React from "react";
import {
  Phone,
  Mail,
  User,
  Users,
  MapPin,
  Calendar,
  Lock,
  BookOpen,
  GraduationCap,
  FileText,
  BadgeCheck,
  Wallet,
} from "lucide-react";

const fmtDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const Card = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white p-6 rounded-3xl shadow-sm border border-gray-200 ${className}`}>
    <h3 className="text-lg font-bold mb-5 flex items-center gap-2 border-b pb-3 border-gray-200">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const InfoItem = ({ label, value, icon, capitalize }) => (
  <div>
    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
      {icon}
      {label}
    </div>
    <p className={`text-gray-900 font-semibold break-words ${capitalize ? "capitalize" : ""}`}>
      {value || value === 0 ? value : "N/A"}
    </p>
  </div>
);

const DocImage = ({ src, alt }) =>
  src ? (
    <a href={src} target="_blank" rel="noreferrer">
      <img
        src={src}
        alt={alt}
        className="w-full h-44 object-cover rounded-lg border border-gray-300"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    </a>
  ) : (
    <div className="w-full h-44 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
      No image
    </div>
  );

const UserOwnProfile = ({ me, onChangePassword }) => {
  const info = me?.information || {};
  const documents = (info.documents || []).filter((d) => d && (d.document_files || d.document_type));
  const certificates = (info.certificates || []).filter((c) => c && (c.degreeName || c.certificateImage));
  const references = (info.references || []).filter((r) => r && (r.name || r.phone));

  return (
    <div className="min-h-screen antialiased text-gray-800">
      {/* Header */}
      <div className="mx-auto mb-4 flex justify-between items-center">
        <div>
          <h4 className="text-xl lg:text-3xl font-extrabold text-gray-900">Account Profile</h4>
          <p className="text-xs lg:text-base text-gray-500">View your personal identity and records.</p>
        </div>
        <button
          onClick={onChangePassword}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-black cursor-pointer"
        >
          <Lock size={16} />
          Change Password
        </button>
      </div>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(info.username || info.full_name || me?.email || "user")}`}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-indigo-50"
            />
            <h2 className="text-xl font-bold mt-3 capitalize">{info.full_name || "Unnamed user"}</h2>
            {info.username && <p className="text-indigo-600 text-sm">@{info.username}</p>}

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {me?.uid !== undefined && me?.uid !== null && (
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">ID #{me.uid}</span>
              )}
              {info.room_number !== undefined && info.room_number !== null && info.room_number !== "" && (
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">Room {info.room_number}</span>
              )}
              {me?.approval_status && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize inline-flex items-center gap-1 ${me.approval_status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  <BadgeCheck size={12} /> {me.approval_status}
                </span>
              )}
            </div>

            <div className="w-full mt-5 pt-4 border-t border-gray-200 space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="shrink-0" />
                <span className="break-all">{me?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="shrink-0" />
                <span>{me?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Wallet size={16} className="shrink-0" />
                <span>Balance: <b className="text-gray-900">৳{Number(me?.balance || 0)}</b></span>
              </div>
            </div>
          </div>

          <Card title="Institute Info" icon={<BookOpen size={18} />}>
            <div className="space-y-3">
              <InfoItem label="Institute" value={info.name_of_institute} />
              <InfoItem label="Institute Type" value={info.instituteType} capitalize />
              <InfoItem label="Joined" value={fmtDate(me?.approved_at || me?.createdAt)} />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Personal Information" icon={<User size={18} />}>
            <div className="grid md:grid-cols-2 gap-4">
              <InfoItem label="Full Name" value={info.full_name} capitalize />
              <InfoItem label="Date of Birth" value={info.date_of_birth} icon={<Calendar size={14} />} />
              <InfoItem label="Gender" value={info.gender} />
              <InfoItem label="Religion" value={info.religion} />
              <InfoItem label="Occupation" value={info.occupation} />
              <InfoItem label="Designation" value={info.designation} />
              <InfoItem label="Year" value={info.year} />
              <InfoItem label="Room No" value={info.room_number} />
            </div>
          </Card>

          <Card title="Family & Guardian" icon={<Users size={18} />}>
            <div className="grid md:grid-cols-2 gap-4">
              <InfoItem label="Father's Name" value={info.father_name} capitalize />
              <InfoItem label="Mother's Name" value={info.mother_name} capitalize />
              <InfoItem label="Guardian's Name" value={info.guardian_name} capitalize />
              <InfoItem label="Relation with Guardian" value={info.relation_with_guardian} capitalize />
            </div>
          </Card>

          <Card title="Address" icon={<MapPin size={18} />}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <InfoItem label="Country" value={info.country} capitalize />
              <InfoItem label="Division" value={info.division} />
              <InfoItem label="District" value={info.district} />
              <InfoItem label="Village" value={info.village} capitalize />
            </div>
            <p className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
              {info.location || "N/A"}
            </p>
          </Card>

          {documents.length > 0 && (
            <Card title="Documents" icon={<FileText size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((d, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold uppercase mb-1">{d.document_type || "Document"}</p>
                    {d.document_number && <p className="text-xs text-gray-500 mb-2">No: {d.document_number}</p>}
                    <DocImage src={d.document_files} alt={d.document_type || "document"} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {certificates.length > 0 && (
            <Card title="Certificates" icon={<GraduationCap size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((c, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-3">
                    <p className="font-bold">{c.degreeName || "Certificate"}</p>
                    {c.result && <p className="text-xs text-gray-500 mb-2">Result: {c.result}</p>}
                    {c.certificateImage && <DocImage src={c.certificateImage} alt={c.degreeName || "certificate"} />}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {references.length > 0 && (
            <Card title="References" icon={<Users size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {references.map((r, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-1">
                    <p className="font-bold capitalize">{r.name}</p>
                    {r.occupation && <p className="text-xs text-gray-500">{r.occupation}</p>}
                    {r.phone && <p className="text-sm text-gray-700">📞 {r.phone}</p>}
                    {r.nid && <p className="text-sm text-gray-700">NID: {r.nid}</p>}
                    {r.nidImage && <DocImage src={r.nidImage} alt="NID" />}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOwnProfile;
