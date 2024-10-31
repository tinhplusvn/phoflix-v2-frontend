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


