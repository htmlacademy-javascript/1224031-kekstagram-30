import { getServerData } from './server';
import { getPictures } from './get-pictures';
import { showBigPicture } from './show-big-picture';
import './form-validate';
import './photo-scale';
import './slider-effects';
import './filters';

getServerData(getPictures);
getServerData(showBigPicture);
