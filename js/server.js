const errorTemplateContent = document.querySelector('#data-error').content.querySelector('.data-error');
const removeErrorMessage = () => errorTemplateContent.remove();
const errorMessage = () => {
  errorTemplateContent.cloneNode(true);
  document.body.append(errorTemplateContent);
  setTimeout(removeErrorMessage, 5000);
};

const getServerData = (onSuccess) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(!response.ok) {
        errorMessage();
      }
      return response.json();
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      errorMessage();
    });
};

const sendServerData = (formData) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  );
};
export {getServerData, sendServerData};
