var GuildData, current;
var nsfwDrop = document.getElementById("nsfw_channel");
var memeDrop = document.getElementById("memes_channel");
var lastUpdate = 0;

window.onload = () => {
    if (!Cookies.get("guilds")) {
        //Back to login
        return (window.location.href = "/login/index.html");
    }
    if (!Cookies.get("editing")) {
        //Back to home
        return (window.location.href = "/index.html");
    }
    var allGuilds = JSON.parse(Cookies.get("guilds"));
    var Guild = allGuilds.find((g) => g.id === Cookies.get("editing"));
    if (!Guild) {
        //Back to home
        return (window.location.href = "/index.html");
    }
    document.getElementById("topbar_guild__name").innerHTML = Guild.name;
    fetch(`${apiURL}bot/guild?guild=${Guild.id}&token=${Cookies.get("hash")}`)
        .then((r) => r.json())
        .then((res) => {
            if (res.code != 200) {
                //Error
                console.log(res.data);
                return false;
            }
            GuildData = res;
            var current = res.current;
            loadChannels();
            console.log("Done fetching");
        });
};
function loadChannels() {
    for (var a = 0; a < GuildData.channels.length; a++) {
        var c = GuildData.channels[a];
        if (c.nsfw) {
            var co = document.createElement("option");
            co.text = `#${c.name}`;
            co.value = c.id;
            nsfwDrop.add(co);
        }
        var ao = document.createElement("option");
        ao.text = `#${c.name}`;
        ao.value = c.id;
        memeDrop.add(ao);
    }
}
function UpdateData() {
    var n = Date.now();
    if (n - lastUpdate <= 5 * 1000) {
        OpenModal("Slow down<br>You're doing that too fast");
        return false;
    }
    lastUpdate = n;
    var memes = document.getElementById("memes_channel");
    var nsfw = document.getElementById("nsfw_channel");
    var fn = {
        guild: Cookies.get("editing"),
        token: Cookies.get("hash"),
        memes: {
            channel: memes.value,
            subreddit: "r/memes",
        },
        meme: {
            channel: nsfw.value,
            subreddit: "r/hentai",
        },
    };
    window
        .fetch(`${apiURL}update`, {
            method: "POST",
            body: JSON.stringify(fn),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((r) => r.json())
        .then((res) => {
            console.log(res.data);
            if (res.code == 200) {
                OpenModal("Saved");
            } else if (res.code == 1006) {
                OpenModal(
                    "Couldn't create a new webhook in that channel.<br>I need MANAGE_WEBHOOK permission for this feature"
                );
            } else {
                console.log(res.data);
                OpenModal("Oops failed to connect to api");
            }
        })
        .catch(console.log);
}
function SendHome() {
    window.location.href = "/";
}
