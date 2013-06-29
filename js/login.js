Ext.require([
    'Ext.form.*'
]);
Ext.onReady(function(){
	var mainPanel = Ext.widget('form', {
        renderTo: Ext.getBody(),
        title: 'Welcome to Bookshelf!',
        width: 500,
        bodyPadding: 20,
        html: 'Pl. Note: You can use Username guest and<br/> Password welcome to browse the site',
        standardSubmit: true,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'User Name',
            name: 'myusername',
            //vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Password',
            inputType: 'password',
            name: 'mypassword',
            allowBlank: false
        }],
        buttons: [{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
                //this.up('window').hide();
            }
        }, {
            text: 'Submit',
            handler: function() {
                if (this.up('form').getForm().isValid()) {
                    // In a real application, this would submit the form to the configured url
                	//click: function(button, event) {
					/*var formDom = this.up('form').getForm().getEl().dom;
					formDom.action = '/first/checklogin.php';
					formDom.method = 'post';
                    formDom.submit(); */
                	this.up('form').getForm().submit({
                	   url: '/first/checklogin.php',
                	  // url: '/checklogin.php',
                	   reset: true}); 
                	/*new Ext.form.action.StandardSubmit({
                	   form: this.up('form').getForm(),
                	   url: '/first/checklogin.php',
                	   reset: true
                	}).run(); */
                    //this.up('form').getForm().reset();
                    //this.up('window').hide();
                    //Ext.MessageBox.alert('Thank you!', 'Your inquiry has been sent. We will respond as soon as possible.');
                }
            }
        }]
    });
});
