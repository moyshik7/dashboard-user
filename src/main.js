var allGuilds;
function main() {
    if (!Cookies.get("username") || !Cookies.get("hash")) {
        //Redirect to /login
        document.location.href = "/login/";
    } else {
        document.getElementById("username").innerHTML = Cookies.get("username");
        document.getElementById("avatarurl").src = Cookies.get("avatar");
        if (!Cookies.get("guilds")) {
            window
                .fetch(`${apiURL}guilds/?token=${Cookies.get("hash")}`)
                .then((res) => res.json())
                .then((guilds) => {
                    Cookies.set("guilds", JSON.stringify(guilds));
                    allGuilds = guilds;
                    window.location.href = window.location.href;
                });
        } else {
            var allGuilds = JSON.parse(Cookies.get("guilds"));
        }
    }
    let n = "";
    if (!allGuilds || !allGuilds.length) {
        n = `<p>Can't find your guild ?<br>You'll need <b>Administrator</b> or <b>Manage Server</b> Permission to edit a guild.</p>`;
    } else {
        var gl = document.getElementById("guild_list");
        allGuilds.forEach((g) => {
            var nnn = document.createElement("button");
            nnn.className = "guild_list";
            nnn.innerText = g.name;
            nnn.addEventListener("click", () => {
                EditGuild(`${g.id}`);
            });
            gl.appendChild(nnn);
        });
    }
}
main();
function EditGuild(_gid) {
    if (!_gid) {
        return false;
    }
    Cookies.set("editing", _gid);
    window.location.href = "./edit/index.html";
}
async function FetchGuilds(_url, _token) {
    return new Promise((resolve, reject) => {
        window
            .fetch(`${_url}guilds/?toktoken_token}`)
            .then((res) => res.json())
            .then((_guilds) => {
                Cookies.set("guilds", JSON.stringify(_guilds));
                resolve(_guilds);
            })
            .catch(reject);
    });
}
