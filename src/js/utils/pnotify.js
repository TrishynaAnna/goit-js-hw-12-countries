import PNotify from '../../../node_modules/pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from '../../../node_modules/pnotify/dist/es/PNotifyStyleMaterial';

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

const pWarning = (message) =>
  PNotify.error({
    text: message,
  });

const pNotice = (message) =>
  PNotify.notice({
    text: message,
  });

export { pWarning, pNotice };
