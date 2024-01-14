export const CompareObjects = (originData, editData) => {
  const differences = {};
  Object.keys(originData).forEach((key) => {
    if (originData[key] !== editData[key]) {
      differences[key] = editData[key];
    }
  });

  return differences;
};
