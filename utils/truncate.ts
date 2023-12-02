const truncateText = (str: string) => {
  if (str.length < 15) {
    return str;
  }
  return str.substring(0, 15) + "...";
};

export default truncateText;
