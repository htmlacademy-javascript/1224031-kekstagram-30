import {showBigPicture} from './show-big-picture';
import {onModalClickClose} from './form-validate';
import {enableSorting} from './sort';
import {getDownloadErrorMessage, getSuccessMessage, getUploadErrorMessage} from './server-error-messages';

const GET_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';
const SEND_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/';

const getServerData = (getPictures) => {
  fetch(GET_SERVER_URL)
    .then((response) => {
      if(!response.ok) {
        getDownloadErrorMessage();
      }
      return response.json();
    })
    .then((pictures) => {
      getPictures(pictures);
      showBigPicture(pictures);
      enableSorting(pictures);
    })
    .catch(() => {
      getDownloadErrorMessage();
    });
};

const sendServerData = (formData) => {
  fetch(SEND_SERVER_URL
    ,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if(!response.ok) {
        getUploadErrorMessage();
      } else {
        getSuccessMessage();
        onModalClickClose();
      }
    })
    .catch(() => {
      getUploadErrorMessage();
    });
};
export {getServerData, sendServerData};
