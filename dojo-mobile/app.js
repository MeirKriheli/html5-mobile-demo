require([
    "dojo/main",
    "dojo/io/script",
    "dojo/data/ItemFileReadStore",
    "dijit/registry",
    "dojox/mobile/parser",
    "dojox/mobile",
    "dojox/mobile/compat",
    "dojox/mobile/Button",
    "dojox/mobile/TextBox",
    "dojox/mobile/RoundRectDataList"
],function(dojo, ioscript, ItemFileReadStore, registry, parser, mobile, compat){
    parser.parse();
    var store = ItemFileReadStore({clearOnClose:true});

    dojo.connect(registry.byId('submit-btn'), 'onClick', function() {
        var username = registry.byId('username').get('value');
        ioscript.get({
            url: 'https://api.github.com/users/'  + escape(username) + '/repos',
            callbackParamName: "callback"
        }).then(function(data) {
            var new_items = [{label:'moo'}];

            store.data = new_items;
            store.close();
            registry.byId('repos-list').setStore(store);
        });
        dijit.byId('user-form').performTransition('repos');
    });
});
