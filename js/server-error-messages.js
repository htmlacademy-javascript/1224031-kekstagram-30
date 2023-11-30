import {isEscapeKey} from './utils';

const ERROR_TIMEOUT = 5000;

const downloadErrorTemplateContent = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadErrorTemplateContent = document.querySelector('#error').content.querySelector('.error');
const uploadErrorCloseButton = uploadErrorTemplateContent.querySelector('.error__button');
const successTemplateContent = document.querySelector('#success').content.querySelector('.success');
const successCloseButton = successTemplateContent.querySelector('.success__button');
const successWrapper = successTemplateContent.querySelector('.success__inner');
const successTitle = successTemplateContent.querySelector('.success__title');

const removeDownloadErrorMessage = () => downloadErrorTemplateContent.remove();
const getDownloadErrorMessage = () => {
  downloadErrorTemplateContent.cloneNode(true);
  document.body.append(downloadErrorTemplateContent);
  setTimeout(removeDownloadErrorMessage, ERROR_TIMEOUT);
};
const onSuccessMessageKeydownRemove = (evt) => {
  if(isEscapeKey(evt)) {
    // eslint-disable-next-line no-use-before-define
    onSuccessMessageClickRemove();
  }
};
const onSuccessMessageFieldClickRemove = (evt) => {
  if (evt.target !== successWrapper && evt.target !== successTitle) {
    // eslint-disable-next-line no-use-before-define
    onSuccessMessageClickRemove();
  }
};
const onSuccessMessageClickRemove = () => {
  successTemplateContent.remove();
  successCloseButton.removeEventListener('click', onSuccessMessageClickRemove);
  document.removeEventListener('keydown', onSuccessMessageKeydownRemove);
  successTemplateContent.removeEventListener('click', onSuccessMessageFieldClickRemove);
};
const getSuccessMessage = () => {
  successTemplateContent.cloneNode(true);
  document.body.append(successTemplateContent);

  successCloseButton.addEventListener('click', onSuccessMessageClickRemove);
  document.addEventListener('keydown', onSuccessMessageKeydownRemove);
  successTemplateContent.addEventListener('click', onSuccessMessageFieldClickRemove);
};
const removeUploadErrorMessage = () => {
  uploadErrorTemplateContent.remove();
  uploadErrorCloseButton.removeEventListener('click', removeUploadErrorMessage);
};
const getUploadErrorMessage = () => {
  uploadErrorTemplateContent.cloneNode(true);
  document.body.append(uploadErrorTemplateContent);
  uploadErrorCloseButton.addEventListener('click', removeUploadErrorMessage);
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      removeUploadErrorMessage();
    }
  });
};

export {getDownloadErrorMessage, getSuccessMessage, getUploadErrorMessage};
