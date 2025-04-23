fetch('/auth', {
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    if (data.auth) {
      document.getElementById('login').innerText = 'Play';
      document.getElementById('login').className = '';
      document.getElementById('login_a').href = window.location.origin + '/learn';
      document.getElementById('logout').className = '';
      document.getElementById('logout').onclick = () => {
        window.location.href = '/auth/logout';
      };
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
  });