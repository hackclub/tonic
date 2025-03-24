const main_container = location.pathname === '/learn.html'
  ? document.getElementById('mutant_container')
  : document.getElementById('index_container');

document.getElementById('attribution_a').onclick = function () {
  if (location.pathname === '/learn.html') {
    play_sound('click');
  }
  document.getElementById('attribution_container').className = '';
  main_container.className = 'oh in';
  document.getElementById('footer').className = 'oh in';
  document.body.className = 'attribution_open';
}

document.getElementById('close_attribution').onclick = function () {
  if (location.pathname === '/learn.html') {
    play_sound('click');
  }
  document.getElementById('attribution_container').className = 'dn';
  main_container.className = '';
  document.getElementById('footer').className = '';
  document.body.className = '';
}