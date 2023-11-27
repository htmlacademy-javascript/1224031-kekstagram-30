import {showBigPicture} from './show-big-picture';
import {closeModal} from './form-validate';
import {resetScale} from './photo-scale';
import {resetEffects} from './slider-effects';
import {enableSorting} from './sort';
import {getDownloadErrorMessage, getSuccessMessage, getUploadErrorMessage} from './server-error-messages';

const GET_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';
const SEND_SERVER_URL = 'https://30.javascript.pages.academy/kekstagra/';

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
        closeModal();
        resetScale();
        resetEffects();
      }
    })
    .catch(() => {
      getUploadErrorMessage();
    });
};
export {getServerData, sendServerData};
