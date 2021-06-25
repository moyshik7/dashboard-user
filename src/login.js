window.onload = () => {
    var url = new URL(window.location.href);
    var code = url.searchParams.get("code");
    if (!code) {
        document.getElementById('not_logged').style.display = "block"
        document.getElementById('logging_in').style.display = "none"
    } else {
        document.getElementById('not_logged').style.display = "none"
        document.getElementById('logging_in').style.display = "block"
        window
            .fetch(`${apiURL}?code=${code}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.code && data.code == 200) {
                    Cookies.set("hash", data.hash);
                    Cookies.set("username", data.user.username);
                    Cookies.set(
                        "avatar",
                        `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`
                    );
                    window.location.href = `/`;
                } else {
                    ShowModal("Oops something went wrong on the api");
                }
            });
    }
};
