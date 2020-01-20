function initTeamInformation() {
    // init tooltip
    var elements = document.querySelectorAll('.tooltipped')
    M.Tooltip.init(elements)

    let actualPage = window.location.hash.substr(1)
    let teamId = actualPage.substr(actualPage.search('=') + 1, actualPage.length)

    let teamImgElement = document.getElementById('team-img')
    let teamNameElement = document.getElementById('team-name')
    let teamFoundedElement = document.getElementById('team-founded')
    let teamAddressElement = document.getElementById('team-address')
    let teamPhoneElement = document.getElementById('team-phone')
    let teamWebsiteElement = document.getElementById('team-website')
    let teamEmailElement = document.getElementById('team-email')

    getTeamInformation(teamId).then(function (result) {
        teamImgElement.src = result.crestUrl
        teamNameElement.innerText = result.name
        teamFoundedElement.innerText = 'Founded : ' + result.founded
        teamAddressElement.innerText = 'Address : ' + result.address
        teamPhoneElement.innerText = 'Phone : ' + result.phone
        teamWebsiteElement.innerHTML = `Website : <a href='${result.website}' target='_blank'>${result.website}</a>`
        teamEmailElement.innerHTML = `Email : <a href='mailto:${result.email}'>${result.email}</a>`

        let btnAddToFavorite = document.getElementById("btnAddToFavorite")
        let preloader = document.getElementById("preloader")

        btnAddToFavorite.classList.remove('hide')
        preloader.classList.add('hide')
        
        checkIsFavorite(parseInt(teamId)).then(function (isFavorite) {
            if(isFavorite){
                btnAddToFavorite.children[0].innerText = "favorite"
                btnAddToFavorite.setAttribute('data-tooltip', 'Remove Team from Favorite')
            } else {
                btnAddToFavorite.children[0].innerText = "favorite_border"
                btnAddToFavorite.setAttribute('data-tooltip', 'Add Team to Favorite')
            }
            
            btnAddToFavorite.onclick = function (event) {
                if(btnAddToFavorite.children[0].innerText == "favorite"){
                    deleteFavoriteTeam(result.id)
                    btnAddToFavorite.children[0].innerText = "favorite_border"
                    btnAddToFavorite.setAttribute('data-tooltip', 'Add Team to Favorite')
                    M.toast({html: 'Team removed from favorite!', classes: 'rounded'})
                } else {
                    saveFavoriteTeam(result)
                    btnAddToFavorite.children[0].innerText = "favorite"
                    btnAddToFavorite.setAttribute('data-tooltip', 'Remove Team from Favorite')
                    M.toast({html: 'Team added to favorite!', classes: 'rounded red'})
                }
            }
        })
    })
}