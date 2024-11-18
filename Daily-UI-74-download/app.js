const download = document.querySelector(".download");
const upload = document.querySelector(".upload");

const changeDL = () => {
  download.style.background =
    "url('./downloading_24.svg') center/cover no-repeat";
  setTimeout(() => {
    download.style.background =
      "url('./download_24.svg') center/cover no-repeat";
  }, 3000);
};
const changeUL = () => {
  upload.style.background =
    "url('./arrow_upload_progress24.svg') center/cover no-repeat";
  setTimeout(() => {
    upload.style.background = "url('./upload_24.svg') center/cover no-repeat";
  }, 3000);
};
download.addEventListener("click", changeDL);
upload.addEventListener("click", changeUL);
