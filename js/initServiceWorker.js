if ('serviceWorker' in navigator) {
    registerServiceWorker()
    requestNotificationPermission()
}

function registerServiceWorker() {
    navigator.serviceWorker.register('./service-worker.js')
        .then(function (registration) {
            return registration
        })
        .catch(function (error) {
            console.error(error)
        })
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result == 'granted') {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.showNotification('Notification permitted!')
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(
                                "BJUHZvsgFaTXWbxsYGs6_yuEWTR9wg2LCr1L_4uXr6PzGutDU2Z8JzUI4hNMeiqlBJMxLAjxFFbyMEDRIvWuInc"
                            )
                        }).then(function (subscribe) {
                            console.log(
                                `Successfully subscribe with endpoint : ${subscribe.endpoint}`
                            )

                            let pKey = btoa(String.fromCharCode.apply(null,
                                new Uint8Array(subscribe.getKey('p256dh'))))
                            console.log(
                                `Successfully subscribe with p256dh key : ${pKey}`)

                            let authKey = btoa(String.fromCharCode.apply(null,
                                new Uint8Array(subscribe.getKey('auth'))))
                            console.log(
                                `Successfully subscribe with auth key : ${authKey}`)

                        }).catch(function (error) {
                            console.error(error)
                        })
                    })
                }
            }
        })
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
}