require([
    "dojo/main",
    "dijit/registry",
    "dojox/mobile/parser",
    "dojox/mobile",
    "dojox/mobile/compat",
    "dojox/mobile/Button",
    "dojox/mobile/TextBox"
],function(dojo, registry, parser, mobile, compat){
    parser.parse();
    dojo.connect(registry.byId('submit-btn'), 'onClick', function() {
        dijit.byId('user-form').performTransition('repos');
    });
});
