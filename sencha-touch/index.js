/*(function(Ext) {*/
    var username = null;

    Ext.regModel('Repo', {
        fields: ['name', 'description', 'pushed_at', 'open_issues']
    });

    var store = new Ext.data.Store({
        model: 'Repo',
        proxy: {
            type: 'scripttag',
            autoLoad: false,
            url: 'change as required',
            reader: {
                root:'data',
                type:'json'
            }
        }
    });

    var repo_panel = new Ext.List({
        id: 'RepoPanel',
        layout: 'fit',
        store: store,
        itemTpl: '<div class="repo"><h1>{name}</h1><p>{description}</p></div>'
    });

    var user_form = {
        dockedItems: [{xtype:'toolbar', title:'GitHub'}],
        xtype: 'form',
        items: [{
            xtype: 'fieldset',
            scroll: 'vertical',
            instructions: 'Please enter GitHub username',
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    label: 'Username',
                    autoCapitalize : true,
                    required: true,
                    useClearIcon: true
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Submit'
        }],
        listeners: {
            beforesubmit: function(form, values, options) {
                Ext.getCmp('MainPanel').setActiveItem(1);
                store.getProxy().url = Ext.util.Format.format('https://api.github.com/users/{0}/repos', values.name);
                store.load();
                repo_panel.refresh();
                return false;
            }
        }
    };

    var main_panel = {
        id: 'MainPanel',
        fullscreen: true,
        layout: 'card',
        items: [user_form, repo_panel]
    };

    new Ext.Application({
        name: 'GitHubViewer',
        launch: function() {
            new Ext.Panel(main_panel);
        }
    });
/*})(Ext);*/
