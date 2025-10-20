fetch("/auth", {
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    if (data.auth) {
      document.getElementById("login").classList.add("hidden");
      document.getElementById("play").classList.remove("hidden");
      document.getElementById("logout").classList.remove("hidden");
    } else {
      document.getElementById("login").classList.remove("hidden");
      document.getElementById("play").classList.add("hidden");
      document.getElementById("logout").classList.add("hidden");
    }
  });
