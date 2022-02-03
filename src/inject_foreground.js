const foreground_entry_point = document.createElement('span');
let reactJS_script = document.createElement('script');

foreground_entry_point.id = 'foreground_12345';
reactJS_script.src = 'foreground.bundle.js';

foreground_entry_point.appendChild(reactJS_script);

document.querySelector("body").appendChild(foreground_entry_point);