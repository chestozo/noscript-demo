ns.View.define('app');

ns.View.define('head');

ns.View.define('index');

ns.View.define('github-profile', {
    models: [ 'github-profile' ]
});

ns.View.define('photos-item', {
    models: [ 'photo' ]
});

ns.ViewCollection.define('photos', {
    models: [ 'photos' ],
    split: {
        byModel: 'photos',
        intoViews: 'photos-item'
    }
});

ns.View.define('photo-preview', {
    models: [ 'photo' ]
});
