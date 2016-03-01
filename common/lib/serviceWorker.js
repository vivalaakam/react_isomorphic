var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
var API_KEY = process.env.MESSAGING_API;


function endpointWorkaround(pushSubscription) {
    if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
        return pushSubscription.endpoint;
    }

    var mergedEndpoint = pushSubscription.endpoint;

    if (pushSubscription.subscriptionId &&
        pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
        mergedEndpoint = pushSubscription.endpoint + '/' +
            pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
}

function sendSubscriptionToServer(subscription) {
    console.log('TODO: Implement sendSubscriptionToServer()');

    var mergedEndpoint = endpointWorkaround(subscription);

    showCurlCommand(mergedEndpoint);
}

function showCurlCommand(mergedEndpoint) {
    if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
        console.log('This browser isn\'t currently supported for this demo');
        return;
    }

    var endpointSections = mergedEndpoint.split('/');
    var subscriptionId = endpointSections[endpointSections.length - 1];

    var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
        '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
        ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';

    console.log(curlCommand);
}

function unsubscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(
            function (pushSubscription) {
                if (!pushSubscription) {
                    return;
                }
                pushSubscription.unsubscribe().then(function () {
                    console.log('Unsubscription success');
                }).catch(function (e) {
                    console.log('Unsubscription error: ', e);
                });
            }).catch(function (e) {
            console.log('Error thrown while unsubscribing from ' +
                'push messaging.', e);
        });
    });
}

function subscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        console.log('state3', serviceWorkerRegistration);
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function (subscription) {
                console.log('state4' , subscription);
                return sendSubscriptionToServer(subscription);
            })
            .catch(function (e) {
                if (Notification.permission === 'denied') {
                    console.log('Permission for Notifications was denied');
                } else {
                    console.log('Unable to subscribe to push.', e);
                }
            });
    });
}

function initialiseState() {
    console.log('state');
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.');
        return;
    }

    if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.');
        return;
    }

    if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        console.log('state1');
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                console.log('state2', subscription);
                if (!subscription) {
                    subscribe();
                } else {
                    sendSubscriptionToServer(subscription);

                }
            })
            .catch(function (err) {
                console.log('Error during getSubscription()', err);
            });
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(initialiseState);
}
