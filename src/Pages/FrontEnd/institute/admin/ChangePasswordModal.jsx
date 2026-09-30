import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useChangePassword } from "../../../../api/cms/user.hook";

const ChangePasswordModal = ({ open, onClose }) => {
  const { mutateAsync, isPending } = useChangePassword();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClose = () => {
    setForm({ current_password: "", new_password: "", confirm_password: "" });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }
    if (form.new_password !== form.confirm_password) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      await mutateAsync({
        current_password: form.current_password,
        new_password: form.new_password,
      });
      handleClose();
    } catch (err) {
      // error toast hook e dekhano hoyeche
    }
  };

  const inputClass =
    "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-indigo-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">Change Password</h3>
          <button onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={show ? "text" : "password"}
            name="current_password"
            value={form.current_password}
            onChange={handleChange}
            placeholder="Current password"
            className={inputClass}
            required
          />
          <input
            type={show ? "text" : "password"}
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="New password (min 6 characters)"
            className={inputClass}
            required
          />
          <input
            type={show ? "text" : "password"}
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Confirm new password"
            className={inputClass}
            required
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
            {show ? "Hide passwords" : "Show passwords"}
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;