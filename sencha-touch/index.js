(function(Ext) {
    var username = null;

    Ext.regModel('Repo', {
        fields: ['name', 'description', 'pushed_at', 'open_issues']
    });

    var store = new Ext.data.Store({
        model: 'Repo',
        sorters: 'name',
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

    var repo_list = new Ext.List({
        id: 'RepoPanel',
        layout: 'fit',
        store: store,
        itemTpl: '<div class="repo"><h1>{name}</h1><p>{description}</p><span class="pushed">{pushed_at}</span><span class="issues">{open_issues} issues</span></div>'
    });

    var repo_panel = {
        dockedItems: [{
            xtype:'toolbar',
            title:'Repos',
            items: [{
                text:'Select user',
                handler: function() {
                    Ext.getCmp('MainPanel').setActiveItem(0);
                }
            }]
        }],
        layout: 'fit',
        items: [repo_list]
    }

    var user_form = {
        dockedItems: [{xtype:'toolbar', title:'GitHub'}],
        xtype: 'form',
        id: "UserForm",
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
            text: 'Submit',
            handler: function() {
                Ext.getCmp('UserForm').submit();
            }
        }],
        listeners: {
            beforesubmit: function(form, values, options) {
                Ext.getCmp('MainPanel').setActiveItem(1);
                store.getProxy().url = Ext.util.Format.format('https://api.github.com/users/{0}/repos', values.name);
                store.load();
                repo_list.refresh();
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
})(Ext);
