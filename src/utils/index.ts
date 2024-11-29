import _ from "lodash";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Không thể sao chép: ", err);
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const validateEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const generateYears = (startYear: number, endYear: number): number[] => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomItemInArray = (array: any) => {
  return array[Math.floor(Math.random() * array.length)];
};
