// import { play_sound } from "./learn/script.js";

// containers to change the opacity for
const oh_containers = location.pathname === '/learn/'
  ? [
    // document.getElementById('back'),
    document.getElementById('options_container'),
    document.getElementById('mutant_container'),
    document.getElementById('image_container'),
    document.getElementById('tasks_container'),
  ]
  : [document.getElementById('index_container')];
// containers to disable user interaction for
const in_containers = location.pathname === '/learn/'
  ? [
    // document.getElementById('back'),
    document.getElementById('options_container'),
    document.getElementById('mutant_container'),
    document.getElementById('image_container'),
  ]
  : [document.getElementById('index_container')];

document.getElementById('attribution_a').onclick = function () {
  // if (location.pathname === '/learn/') {
  //   play_sound('click');
  // }
  document.getElementById('attribution_container').className = '';
  oh_containers.forEach(c => c.classList.add('oh'));
  in_containers.forEach(c => c.classList.add('in'));
  document.getElementById('footer').className = 'oh in';
  document.body.className = 'attribution_open';
}

document.getElementById('close_attribution').onclick = function () {
  // if (location.pathname === '/learn/') {
  //   play_sound('click');
  // }
  document.getElementById('attribution_container').className = 'dn';
  oh_containers.forEach(c => c.classList.remove('oh'));
  in_containers.forEach(c => c.classList.remove('in'));
  document.getElementById('footer').className = '';
  document.body.className = '';
}