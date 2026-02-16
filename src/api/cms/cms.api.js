export const getUserDataFunction = async () => {
  const { data } = await axio("/api/auth/me");
  return data;
};
