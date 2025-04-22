const authenticated = document.cookie.match(/uid=U[A-Z0-9]+/);

if (authenticated) {
  document.getElementById('login').innerText = 'Play';
  document.getElementById('login').className = '';
  document.getElementById('login_a').href = window.location.origin
    + '/learn';
} else {
  document.getElementById('login').innerText = 'Sign in with Slack';
  document.getElementById('login').className = 'w150';
  document.getElementById('logout').className = 'dn';
  document.getElementById('login_a').href = 'https://hackclub.slack.com/oauth'
    + '?client_id=2210535565.8800685498865'
    + '&scope='
    + '&user_scope=openid'
    + `&redirect_uri=${window.location.origin}/auth/slack`
    + '&state='
    + '&granular_bot_scope=1'
    + '&single_channel=0'
    + '&install_redirect='
    + '&tracked=1'
    + '&team=';
}