import { getServerData } from './server.js';
import { getPictures } from './getPictures.js';
import { showBigPicture } from './showBigPicture.js';
import './formValidate.js';
import './photoScale.js';
import './sliderEffects.js';

getServerData(getPictures);
getServerData(showBigPicture);
