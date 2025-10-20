fetch("/auth", {
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    if (data.auth) {
      document.getElementById("login").classList.add("dn");
      document.getElementById("play").classList.remove("dn");
      document.getElementById("logout").classList.remove("dn");
    } else {
      document.getElementById("login").classList.remove("dn");
      document.getElementById("play").classList.add("dn");
      document.getElementById("logout").classList.add("dn");
    }
  });
