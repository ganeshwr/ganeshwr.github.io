let dbPromised = idb.open('football-portal-db', 1, function (upgradeDb) {
    let favoriteTeamObjectStore = upgradeDb.createObjectStore("favoriteTeam", {keyPath: 'id'})
})

function saveFavoriteTeam(team) {
    dbPromised.then(function (db) {
        let tx = db.transaction('favoriteTeam', 'readwrite')
        let store = tx.objectStore('favoriteTeam')

        store.add(team)

        return tx.complete
    })
    .then(function (result) {
        console.log('Team added to favorite!')
    })
    .catch(function (error) {
        console.error('Failed to add team to favorite : '+error)
    })
}

function deleteFavoriteTeam(teamId) {
    dbPromised.then(function (db) {
        let tx = db.transaction('favoriteTeam', 'readwrite')
        let store = tx.objectStore('favoriteTeam')

        store.delete(teamId)

        return tx.complete
    })
    .then(function (result) {
        console.log('Team deleted from favorite!')
    })
    .catch(function (error) {
        console.error('Failed to delete team from favorite : '+error)
    })
}

function loadFavoriteTeam() {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            let tx = db.transaction('favoriteTeam', 'readonly')
            let store = tx.objectStore('favoriteTeam')

            return store.getAll()
        })
        .then(function (result) {
            resolve(result)
        })
    })
}

function checkIsFavorite(teamId) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            let tx = db.transaction('favoriteTeam', 'readonly')
            let store = tx.objectStore('favoriteTeam')

            return store.get(teamId)
        })
        .then(function (result) {
            if(result != undefined){
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}