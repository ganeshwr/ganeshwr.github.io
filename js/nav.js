document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elements)

    let page = window.location.hash.substr(1)
    if (page == "") {
        page = 'home'
    } else if(page.indexOf('team-information?id') == 0){
        page = 'team-information'
    }
    
    loadPage(page).then(function () {
        // event listener for nav
        document.querySelectorAll(".sidenav a, .topnav a, .footer a, .home-link a").forEach(element => {
            element.addEventListener("click", function (event) {
                // close sidenav
                var sidenav = document.querySelector(".sidenav")
                M.Sidenav.getInstance(sidenav).close()

                // load called page content
                page = event.target.getAttribute("href").substr(1)
                loadPage(page)
            })
        });
    })
});

function loadPage(page) {
    return new Promise(function (resolve, reject) {
        // reset all active link
        document.querySelectorAll(`.active`).forEach(function (element) {
            element.classList.remove('active')
        })
        
        // link active
        document.querySelectorAll(`[href='#${page}']`).forEach(function (element) {
            element.parentElement.classList.add('active');
        });
        
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content")
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText

                    if(page == 'classement'){
                        initClassement()
                    } else if( page == 'team-information'){
                        initTeamInformation()
                    } else if(page == 'favorite-team'){
                        initFavoriteTeam()
                    }
                    
                    resolve()
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Page not found.</p>"
                    reject()
                } else {
                    content.innerHTML = "<p> Page not accessible at the moment... </p>"
                    reject()
                }
            }
        }

        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    })
}