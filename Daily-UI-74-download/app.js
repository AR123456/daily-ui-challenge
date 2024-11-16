const download = document.querySelector(".download");
const upload = document.querySelector(".upload");

const changeDL = () => {
  download.style.background =
    "url('./downloading_24.svg') center/cover no-repeat";
};
const changeUL = () => {
  upload.style.background =
    "url('./arrow_upload_progress24.svg') center/cover no-repeat";
};
download.addEventListener("click", changeDL);
upload.addEventListener("click", changeUL);
