import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAllPackage,
  useGetItems,
  usePackageUpdate,
} from "../../../api/admin/admin.api";
import { Controller, useForm } from "react-hook-form";
import { BiPackage } from "react-icons/bi";
import { FaMinus, FaMoneyBill, FaPlus } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import Select from "react-select";
import { components } from "react-select";
import toast from "react-hot-toast";

const dayNames = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const CustomOption = (props) => (
  <div
    {...props.innerProps}
    className="flex items-center justify-between gap-3 p-2 hover:bg-gray-100"
  >
    <div className="flex items-center gap-3">
      <img
        src={props.data.image}
        alt={props.data.label}
        className="w-10 h-10 rounded object-cover"
      />
      <div className="flex flex-col">
        <span className="font-semibold">{props.data.label}</span>
        <span className="text-xs text-orange-600">৳{props.data.price}</span>
      </div>
    </div>
  </div>
);

const CustomMultiValueLabel = (props) => (
  <components.MultiValueLabel {...props}>
    <div className="flex items-center gap-1">
      <img
        src={props.data.image}
        alt={props.data.label}
        className="w-4 h-4 rounded object-cover"
      />
      <span>{props.data.label}</span>
      <span className="text-orange-600 text-xs">(৳{props.data.price})</span>
    </div>
  </components.MultiValueLabel>
);

const toOption = (item) => ({
  value: item,
  title: item.title,
  label: item.title,
  _id: item._id,
  price: +item.price,
  image: item.image,
  video: item.video,
  ingridents: item.ingridents,
});

const UpdatePackage = () => {
  const { id } = useParams();

  const { data: items = [] } = useGetItems();
  const { data: allPackages = [], isLoading } = useAllPackage();
  const { mutateAsync, isPending } = usePackageUpdate();

  const [alternativeGroups, setAlternativeGroups] = useState([[]]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      day: null,
      title: "",
      price: "",
      items: [],
    },
  });

  const selectedItems = watch("items") || [];
  const selectedDay = watch("day");

  const itemOptions = items.map(toOption);

  // ── title string থেকে options resolve করে ───────────────────────────────
  // stored format: [{title: "ভাত,ডাল,ডিম"}]
  const resolveOptionsFromTitleString = (storedList = []) => {
    if (!storedList.length) return [];
    const titles = storedList[0]?.title?.split(",") ?? [];
    return titles
      .map((t) => {
        const match = items.find((i) => i.title === t.trim());
        return match ? toOption(match) : null;
      })
      .filter(Boolean);
  };

  // alternative_items: [{title: "খিচুড়ি,মাংস"}, {title: "ভাত,ডিম"}]
  const resolveAltGroups = (altItems = []) => {
    if (!altItems.length) return [[]];
    return altItems.map((group) => {
      const titles = group?.title?.split(",") ?? [];
      return titles
        .map((t) => {
          const match = items.find((i) => i.title === t.trim());
          return match ? toOption(match) : null;
        })
        .filter(Boolean);
    });
  };

  // ── Populate form ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!allPackages.length || !items.length) return;

    const singlePackage = allPackages.find((pkg) => pkg?._id === id);
    if (!singlePackage) return;

    reset({
      day: singlePackage.day ?? null,
      title: singlePackage.package_title ?? "",
      price: singlePackage.package_price ?? "",
      items: resolveOptionsFromTitleString(singlePackage.items),
    });

    setAlternativeGroups(resolveAltGroups(singlePackage.alternative_items));
  }, [allPackages, items, id, reset]);

  // ── Alternative group handlers ───────────────────────────────────────────
  const handleAlternativeChange = (groupIndex, newValues) => {
    const selectedItemsTotalPrice = selectedItems.reduce(
      (sum, opt) => sum + opt.price,
      0,
    );
    const totalAltPrice = newValues.reduce((sum, opt) => sum + opt.price, 0);

    if (totalAltPrice <= selectedItemsTotalPrice) {
      setAlternativeGroups((prev) => {
        const updated = [...prev];
        updated[groupIndex] = newValues;
        return updated;
      });
    } else {
      toast.error(
        `Alternative items এর মোট দাম ৳${selectedItemsTotalPrice} এর বেশি হতে পারবে না!`,
        {
          duration: 3000,
          position: "top-right",
          style: { background: "#f97316", color: "#fff", fontWeight: "600" },
        },
      );
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  // ── Submit ───────────────────────────────────────────────────────────────
  const onSubmit = async (formData) => {
    const payload = {
      day: formData.day,
      package_title: formData.title,
      package_price: formData.price,
      items: [{ title: formData.items.map((opt) => opt.label).join(",") }],
      alternative_items: alternativeGroups
        .filter((group) => group.length > 0)
        .map((group) => ({
          title: group.map((opt) => opt.label).join(","),
        })),
    };

    await mutateAsync({ id, payload });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Update Package</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* ── Day Selection ── */}
        <div className="flex flex-col gap-2">
          <input
            type="hidden"
            {...register("day", { required: "Please select a day" })}
          />
          <div className="flex flex-wrap gap-3">
            {dayNames.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setValue("day", day, { shouldValidate: true })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedDay === day
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.day && (
            <span className="text-red-500 text-xs">{errors.day.message}</span>
          )}
        </div>

        {/* ── Package Name ── */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <BiPackage size={16} /> Package Name
          </label>
          <input
            {...register("title", {
              required: "Package name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            type="text"
            placeholder="e.g. Family Meal"
            className={inputClass(errors.title)}
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        {/* ── Package Price ── */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FaMoneyBill size={16} /> Package Price (৳)
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Enter a valid price (e.g. 150 or 99.99)",
              },
            })}
            type="number"
            placeholder="e.g. 350"
            className={inputClass(errors.price)}
          />
          {errors.price && (
            <span className="text-red-500 text-xs">{errors.price.message}</span>
          )}
        </div>

        {/* ── Package Items ── */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MdRestaurantMenu size={16} /> Package Items
          </label>
          <Controller
            name="items"
            control={control}
            rules={{ required: "Please select at least one item" }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={itemOptions}
                value={field.value}
                getOptionValue={(opt) => opt.value._id}
                components={{
                  Option: CustomOption,
                  MultiValueLabel: CustomMultiValueLabel,
                }}
                onChange={(val) => {
                  field.onChange(val);
                  setAlternativeGroups([[]]);
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: errors.items ? "#ef4444" : base.borderColor,
                  }),
                }}
              />
            )}
          />
          {errors.items && (
            <span className="text-red-500 text-xs">{errors.items.message}</span>
          )}
        </div>

        {/* ── Alternative Items ── */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MdRestaurantMenu size={16} /> Package Alternative Items
          </label>
          {alternativeGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-2 mb-3">
              <div className="flex-1">
                <Select
                  isMulti
                  options={itemOptions}
                  value={group}
                  hideSelectedOptions={true}
                  onChange={(val) => handleAlternativeChange(groupIndex, val)}
                  isDisabled={selectedItems.length === 0}
                  placeholder={
                    selectedItems.length === 0
                      ? "First select items above..."
                      : `Alternative group ${groupIndex + 1}...`
                  }
                  components={{
                    Option: CustomOption,
                    MultiValueLabel: CustomMultiValueLabel,
                  }}
                />
              </div>

              {groupIndex > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setAlternativeGroups((prev) =>
                      prev.filter((_, i) => i !== groupIndex),
                    )
                  }
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <FaMinus />
                </button>
              )}

              {groupIndex === alternativeGroups.length - 1 && (
                <button
                  type="button"
                  onClick={() => setAlternativeGroups((prev) => [...prev, []])}
                  className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                >
                  <FaPlus />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-60"
        >
          {isPending ? "Updating..." : "Update Package"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePackage;
