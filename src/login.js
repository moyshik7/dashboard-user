window.onload = () => {
    document.getElementById("info").innerHTML = "loaded";
    var url = new URL(window.location.href);
    var code = url.searchParams.get("code");
    if (!code) {
        window.location.href = oauthURL;
        document.getElementById("info").innerHTML = "No Code";
    } else {
        document.getElementById("info").innerHTML = "Sending request";
        window
            .fetch(`${apiURL}?code=${code}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.code && data.code == 200) {
                    Cookies.set("hash", data.hash);
                    Cookies.set("username", data.user.username);
                    Cookies.set(
                        "avatar",
                        `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`
                    );
                    window.location.href = `/`;
                } else {
                    console.log(data.data)
                    console.log(data)
                    document.getElementById("info").innerHTML =
                        "An error occurred on our side";
                }
            });
    }
};
