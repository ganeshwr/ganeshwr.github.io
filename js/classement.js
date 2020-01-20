function initClassement() {
    document.querySelectorAll(".classement-btn").forEach(element => {
        element.addEventListener("click", function (event) {
            // // reset all active card
            document.querySelectorAll(`.classement-btn`).forEach(function (element) {
                element.parentElement.parentElement.classList.remove('z-depth-5')
            })

            // set active card
            element.parentElement.parentElement.classList.add('z-depth-5')

            // reset table
            document.getElementById('classement-table').innerHTML = ""

            let leagueId = element.getAttribute('data-league')
            showClassement(leagueId)
        })
    });
}

function showClassement(id) {
    let preloader = document.getElementById("preloader")
    preloader.classList.remove('hide')
    
    getClassement(id).then(function (result) {
        preloader.classList.add('hide')
        
        let dataStandings = result.standings
        let dataTable = result.standings[0].table

        if (dataStandings[0].group == null) {
            let tableOpen = "<table>"
            let tableHead = `
                <thead>
                    <tr>
                        <th>Club</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                    </tr>
                </thead>
            `
            let tableBodyOpen = "<tbody>"
            let clubElement = ''
            let tableBodyClose = "</tbody>"
            let tableClose = "</table>"

            let tempContainer = document.createElement('div')

            dataTable.forEach(club => {
                clubElement += `
                    <tr>
                        <td class="classement-club">
                            <img class="classement-club-img"
                                src="${club.team.crestUrl}"
                                alt="${club.team.name}"
                                onerror="this.onerror=null;this.src='/img/errorImage.png'">
                            <a href="#team-information?id=${club.team.id}" onclick="loadPage('team-information')">${club.team.name}</a>
                        </td>
                        <td>${club.won}</td>
                        <td>${club.draw}</td>
                        <td>${club.lost}</td>
                    </tr>
                `
            });

            let entireTable = tableOpen + tableHead + tableBodyOpen + clubElement + tableBodyClose + tableClose
            tempContainer.innerHTML = entireTable
            let resultElement = tempContainer.firstChild

            document.getElementById('classement-table').append(resultElement)
        } else {
            dataStandings.forEach(groupJSON => {
                let groupHeader = `<h4>${groupJSON.group.split('_').join(' ')}</h4>`
                let tableOpen = "<table>"
                let tableHead = `
                    <thead>
                        <tr>
                            <th>Club</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                        </tr>
                    </thead>
                `
                let tableBodyOpen = "<tbody>"
                let clubElement = ''
                let tableBodyClose = "</tbody>"
                let tableClose = "</table>"

                groupJSON.table.forEach(club => {
                    clubElement += `
                        <tr>
                            <td class="classement-club">
                                <img class="classement-club-img"
                                    src="${club.team.crestUrl}"
                                    alt="${club.team.name}"
                                    onerror="this.onerror=null;this.src='/img/errorImage.png'">
                                <a href="#team-information?id=${club.team.id}" onclick="loadPage('team-information')">${club.team.name}</a>
                            </td>
                            <td>${club.won}</td>
                            <td>${club.draw}</td>
                            <td>${club.lost}</td>
                        </tr>
                    `
                });

                let tempContainer = document.createElement('div')

                let entireTable = tableOpen + tableHead + tableBodyOpen + clubElement + tableBodyClose + tableClose
                tempContainer.innerHTML = groupHeader + entireTable + "<br><br><br>"
                let resultElement = tempContainer

                document.getElementById('classement-table').append(resultElement)
            });
        }
    })
}