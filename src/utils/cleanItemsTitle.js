// "ভাত (২৯ চাউল) ২৫০ গ্রাম,মাছ রুই ৫৫-৬৫ গ্রাম,ডাল" -> "ভাত, মাছ রুই, ডাল"
export const cleanItemsTitle = (title) => {
  if (!title) return "—";
  return (
    title
      .split(",")
      .map((item) => {
        let t = item
          .replace(/\([^)]*\)/g, "")
          .replace(
            /[\d০-৯]+\s*(-|–)?\s*[\d০-৯]*\s*(গ্রাম|গ্রা|কেজি|কেজী|লিটার|মিলি|মি\.?লি\.?)?\s*$/,
            "",
          )
          .trim();
        return t;
      })
      .filter(Boolean)
      .join(", ") || "—"
  );
};