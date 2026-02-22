import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAllPage } from "../../../api/admin/admin.api";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Pages = () => {
  const { data } = useAllPage();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">All Page lists</h2>
        <Link
          to="/admin/dashboard/add-page"
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg text-xs md:text-sm transition active:scale-95"
        >
          <Plus size={18} />
          Add Page
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Page Title
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Page Content
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Status
              </th>
              <th className="px-2 md:px-4 py-2 border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Data found
                </td>
              </tr>
            )}

            {data?.map((page) => (
              <tr key={page._id}>
                <td className="px-2 md:px-4 py-2 border border-gray-300 break-words max-w-[250px]">
                  <p className="line-clamp-2">{page.title}</p>
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  <p
                    dangerouslySetInnerHTML={{ __html: page.content }}
                    className="[&_h1]:text-xl [&_h2]:text-xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside line-clamp-2"
                  />
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
      ${
        page.status === "published"
          ? "bg-green-100 text-green-700"
          : page.status === "draft"
            ? "bg-yellow-100 text-yellow-700"
            : page.status === "archived"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
      }`}
                  >
                    {page.status}
                  </span>
                </td>

                <td className="px-2 md:px-4 py-2 border  border-gray-300 ">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/admin/dashboard/update-notice/${page?._id}`}
                      className="text-lg md:text-xl hover:text-violet-700 duration-300"
                    >
                      <FiEdit />
                    </Link>

                    <button
                      // onClick={() => handleDelete(notice)}
                      // disabled={isPending}
                      className="text-lg md:text-xl hover:text-red-600 duration-300"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pages;
