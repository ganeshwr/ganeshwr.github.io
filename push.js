// don't have to be in this directory, this file can be placed anywhere

var webPush = require('web-push')

const vapidKeys = {
    publicKey: "BJUHZvsgFaTXWbxsYGs6_yuEWTR9wg2LCr1L_4uXr6PzGutDU2Z8JzUI4hNMeiqlBJMxLAjxFFbyMEDRIvWuInc",
    privateKey: "Cr05eOi-yzThEISdFnZHPX60qQ5vnn3u67WlYbdUwlg"
}

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dBYLtU-Fr9o:APA91bEvuofIeCAjsO6mY_PLrnkc8vkAlYez_Tt9nun4dyGpXXHwNhxRP6L5KJThPT67gWKLNvz04EWIM8EctXA_gw3eo3ENWxIJdHPFh0CsO3r4SPCcKQ2yHJY3YnILILlXMcW4oYMM",
    keys: {
        p256dh: "BPnzMtUE7kDQSbLgNqFq+fNMM/PpvV0quo2V8AQpLPnsFHtmSf7jDGqCMK45bGajvPgG6IJB6b4vRxcfPIC2wls=",
        auth: "OM1wcIo8mjBTgnLydtMXLA=="
    }
}

var payload = "Don't forget to check daily classement about your favorite team!"

var options = {
    gcmAPIKey: "815256816689",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)