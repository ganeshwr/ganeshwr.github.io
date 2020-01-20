function initFavoriteTeam() {
    loadFavoriteTeam().then(function (teams) {
        let favoriteTeam = document.getElementById('favoriteTeam')

        let elementFavoriteTeam = ''

        teams.forEach(team => {
            elementFavoriteTeam += `
            <div class="col s4">
                <div class="card small">
                    <div class="card-image favorite-team">
                        <img class="favorite-team-img" src="${team.crestUrl}">
                    </div>
                    <div class="card-action">
                        <a href="#team-information?id=${team.id}" 
                        onclick="loadPage('team-information')"><b>${team.name}</b></a>
                    </div>
                </div>
            </div>
            `
        });

        favoriteTeam.innerHTML = elementFavoriteTeam;
    })
}