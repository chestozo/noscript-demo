var ns = ns || require('noscript');

ns.router.routes = {
    route: {
        '/photos/{image-id:int}': 'photo',
        '/photos': 'photo',
        '/': 'index'
    }
};
