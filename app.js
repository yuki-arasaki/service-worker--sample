if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js') 
        .then(function (registration) {
            console.log('[sw.js registered]')
        })
        .catch(function (err) {
            console.log('[sw.js err]')
        })
    })
}