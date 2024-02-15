import { DefaultImg } from "../settings/config";

export const setDefaultImage = (image) => {
  console.log(image);
  return image || DefaultImg;
};
