import Compress from 'compress.js';

const compress = new Compress();

export const resizeImage = async (_file) => {
  const compressRes = await compress.compress([_file], {
    size: 4, // the max size in MB, defaults to 2MB
    quality: 0.75, // the quality of the image, max is 1,
    maxWidth: 360, // the max width of the output image, defaults to 1920px
    maxHeight: 360, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  });

  // returns an array of compressed images
  const compressedFile = await Compress.convertBase64ToFile(
    compressRes[0].data,
    compressRes[0].ext
  );

  return compressedFile;
};
