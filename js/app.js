Ext.require([
    'Ext.form.*'
]);

Ext.onReady(function(){
    Ext.QuickTips.init();

    var win;
    function showContactForm() {
        if (!win) {
            var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                url: '/first/sendmail.php',
                //url: '/sendmail.php',

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                defaults: {
                    margins: '0 0 10 0'
                },

                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Your Name',
                    labelStyle: 'font-weight:bold;padding:0',
                    layout: 'hbox',
                    defaultType: 'textfield',

                    fieldDefaults: {
                        labelAlign: 'top'
                    },

                    items: [{
                        flex: 1,
                        name: 'firstname',
                        fieldLabel: 'First',
                        allowBlank: false
                    }, {
                        width: 30,
                        name: 'middleinitial',
                        fieldLabel: 'MI',
                        margins: '0 0 0 5'
                    }, {
                        flex: 2,
                        name: 'lastname',
                        fieldLabel: 'Last',
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }]
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Your Email Address',
                    name: 'email_id',
                    vtype: 'email',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Subject',
                    name: 'subject',
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Message',
                    name: 'message',
                    labelAlign: 'top',
                    flex: 1,
                    margins: '0',
                    allowBlank: false
                }],

                buttons: [{
                    text: 'Cancel',
                    handler: function() {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                }, {
                    text: 'Send',
                    handler: function() {
                        if (this.up('form').getForm().isValid()) {
                            // In a real application, this would submit the form to the configured url
                            this.up('form').getForm().submit({
                               success: function(form, action) {
                                //Ext.Msg.alert('Success', action.result.msg);
                            	form.reset(); //this.up('form').getForm().reset();
                                win.hide(); //this.up('window').hide();
                                Ext.MessageBox.alert('Thank you!', 'Your message has been sent');
                             },
                             failure: function(form, action) {
                                 //Ext.Msg.alert('Failed', action.result.msg);
                            	 form.reset(); //this.up('form').getForm().reset();
                                 win.hide(); //this.up('window').hide();
                                 Ext.MessageBox.alert('Sorry!', 'Your message could not be sent at this time, try later');
                             }
                         });
                        }
                    }
                }]
            });

            win = Ext.widget('window', {
                title: 'Contact Us',
                closeAction: 'hide',
                width: 400,
                height: 400,
                minHeight: 400,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
        }
        win.show();
    }
    var dateMenu = Ext.create('Ext.menu.DatePicker', {
        handler: function(dp, date){
            Ext.example.msg('Date Selected', 'You choose {0}.', Ext.Date.format(date, 'M j, Y'));

        }
    });

    var colorMenu = Ext.create('Ext.menu.ColorPicker', {
        handler: function(cm, color){
            Ext.example.msg('Color Selected', '<span style="color:#' + color + ';">You choose {0}.</span>', color);
        }
    });
/*
    var store = Ext.create('Ext.data.ArrayStore', {
        fields: ['abbr', 'state'],
        data : Ext.example.states
    });

    var combo = Ext.create('Ext.form.field.ComboBox', {
        hideLabel: true,
        store: store,
        displayField: 'state',
        typeAhead: true,
        queryMode: 'local',
        triggerAction: 'all',
        emptyText: 'Select a state...',
        selectOnFocus: true,
        width: 135,
        iconCls: 'no-icon'
    });
*/
    var menu = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        style: {
            overflow: 'visible'     // For the Combo popup
        },
        items: [
            //combo,                  // A Field in a Menu
            {
                text: 'I like Java',
                checked: true,       // when checked has a boolean value, it is assumed to be a CheckItem
                checkHandler: onItemCheck
            }, '-', {
                text: 'Radio Options',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        '<b class="menu-title">Choose a Topic</b>',
                        {
                            text: 'Big Data',
                            checked: true,
                            group: 'theme',
                            checkHandler: displayw  //onItemCheck
                        }, {
                            text: 'Servlets',
                            checked: false,
                            group: 'theme',
                            checkHandler: displayw  //onItemCheck
                        }, {
                            text: 'Spring Framework',
                            checked: false,
                            group: 'theme',
                            checkHandler: displayw 
                        }, {
                            text: 'Java Server Faces',
                            checked: false,
                            group: 'theme',
                            checkHandler: displayw
                        }, {
                            text: 'Struts Framework',
                            checked: false,
                            group: 'theme',
                            checkHandler: displayw
                        }
                    ]
                }
           } /*,{
               text: 'Choose a Date',
               iconCls: 'calendar',
               menu: dateMenu // <-- submenu by reference
           },{
               text: 'Choose a Color',
               menu: colorMenu // <-- submenu by reference
           } */
        ]
    });

    var tb = Ext.create('Ext.toolbar.Toolbar');
    tb.suspendLayout = true;
    tb.width = 720;
    tb.render('toolbar');

    tb.add({
             text:'Options',
       //     iconCls: 'bmenu',  // <-- icon
             menu: menu  // assign menu by instance
        },
      /*  Ext.create('Ext.button.Split', {
            text: 'Split Button',
            handler: onButtonClick,
            tooltip: {text:'This is a an example QuickTip for a toolbar item', title:'Tip Title'},
            iconCls: 'blist',
            // Menus can be built/referenced by using nested menu config objects
            menu : {
                items: [{
                    text: '<b>Bold</b>', handler: onItemClick
                }, {
                    text: '<i>Italic</i>', handler: onItemClick
                }, {
                    text: '<u>Underline</u>', handler: onItemClick
                }, '-', {
                    text: 'Pick a Color',
                    handler: onItemClick,
                    menu: {
                        showSeparator: false,
                        items: [
                            Ext.create('Ext.ColorPalette', {
                                listeners: {
                                    select: function(cp, color){
                                        Ext.example.msg('Color Selected', 'You chose {0}.', color);
                                    }
                                }
                            }), '-',
                            {
                                text: 'More Colors...',
                                handler: onItemClick
                            }
                        ]
                    }
                }, {
                    text: 'Extellent!',
                    handler: onItemClick
                }]
            }
        }), */ '-', {
        text: 'Access Books',
        enableToggle: true,
        toggleHandler: onItemToggle,
        pressed: true
    });

    //menu.add(' ');

    // Menus have a rich api for
    // adding and removing elements dynamically
    //var item = menu.add({
    //    text: 'Dynamically added Item'
    //});
    // items support full Observable API
    //item.on('click', onItemClick);

    // items can easily be looked up
    /*menu.add({
        text: 'Disabled Item',
        id: 'disableMe'  // <-- Items can also have an id for easy lookup
        // disabled: true   <-- allowed but for sake of example we use long way below
    });
    // access items by id or index
    menu.items.get('disableMe').disable();
*/
    // They can also be referenced by id in or components
    /*tb.add('-', {
        icon: 'list-items.gif', // icons can also be specified inline
        cls: 'x-btn-icon',
        tooltip: '<b>Quick Tips</b><br/>Icon only button with tooltip',
        handler: function(){
            Ext.example.msg('Button Click','You clicked the "icon only" button.');
        }
    }, '-');

    var scrollMenu = Ext.create('Ext.menu.Menu');
    for (var i = 0; i < 50; ++i){
        scrollMenu.add({
            text: 'Item ' + (i + 1),
            handler: onItemClick
        });
    }
    // scrollable menu
    tb.add({
        icon: 'preview.png',
        cls: 'x-btn-text-icon',
        text: 'Scrolling Menu',
        menu: scrollMenu
    });
*/
    tb.add('-', {
        text: 'Access Bookshelf',
        id: 'disablethis',
        handler: function(){window.top.location.href = 'http://localhost/first/main_login.php';},
      //  handler: function(){window.top.location.href = 'http://bookshelf.99k.org/main_login.php';},
    //  handler: function(){window.top.location.href = 'http://box12.host1free.com/~booksh3/main_login.php';},
        //url: '/first/main_login.php', //'http://www.google.com/search',
        //url: 'http://bookshelf.99k.org/main_login.php',
        //baseParams: {
        //    q: 'html+anchor+tag'
        //},
        tooltip: 'This link will take you to Login Screen'
    },'-', {
        text: 'Hadoop',
        url: '/first/hadoopex.html',
        //url: '/hadoopex.html',
        tooltip: 'This link will take you to Yahoo site'
    },'-', {
        text: 'Google Search',
        url: 'http://www.google.co.in', 
        tooltip: 'This link will take you to Google Search'
    },'-', {
        text: 'Sencha',
        url: 'http://www.sencha.com', 
        tooltip: 'This link will take you to Sencha and Extjs'
    },'-', {
        text: 'Java',
        url: 'http://java.sun.com', 
        tooltip: 'This link will take you to Java Site'
    },'-', {
        text: 'Payments',
        //iconCls: 'user',
        menu: {
            xtype: 'menu',
            plain: true,
            items: {
                xtype: 'buttongroup',
                title: 'Payment Options',
                columns: 2,
                items: [{
                    colspan: 2,
                    text: 'Payment',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments', '<h2>Send me email if you want to pay : ngoswamy@hotmail.com<p>or leave a message on the site click Send Message</h2>');
                     // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                } /*{
                    colspan: 2,
                    text: 'Local Cheque 1',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments by Local Cheque', '<h2>LOCAL CHEQUE DEPOSIT AT A BRANCH OF HDFC BANK IN YOUR CITY</h2><p>If your city has a branch of HDFC Bank, you can pay by local cheque. Prepare a cheque drawn in favour of <b>Neeraj Goswamy</b> and deposit the same in your city\'s HDFC Bank branch to HDFC Bank Savings Account No. <b>04801000036692</b> (held at New Delhi).</p><p>After depositing the cheque, send an email to ngoswamy@hotmail.com quoting your Name, Address, Cheque number, Cheque amount, HDFC bank branch name and City where deposited.</p><h4>Outstation cheques are not accepted</h4>');
                      Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                },{
                    colspan: 2,
                    text: 'Local Cheque 2',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments by Local Cheque', '<h2>LOCAL CHEQUE DEPOSIT AT A BRANCH OF ICICI BANK IN YOUR CITY</h2><p>If your city has a branch of ICICI Bank, you can pay by local cheque. Prepare a cheque drawn in favour of <b>Neeraj Goswamy</b> and deposit the same in your city\'s ICICI Bank branch to ICICI Bank Savings Account No. <b>004601002194</b> (held at New Delhi).</p><p>After depositing the cheque, send an email to ngoswamy@hotmail.com quoting your Name, Address, Cheque number, Cheque amount, ICICI bank branch name and City where deposited.</p><h4>Outstation cheques are not accepted</h4>');
                     // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                },{
                    colspan: 2,
                    text: 'Wire Transfer 1',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments via Wire Transfer', '<h2>WIRE TRANSFER</h2><p>You can send your payment by Wire transfer to our ICICI Bank account held at New Delhi</p><p style="margin-left:20"><b>Beneficiary Name:</b> NEERAJ GOSWAMY <b>Bank Name:</b> ICICI BANK<br /><b>Beneficiary Account Number:</b> 004601002194 <b>Account Type:</b> Savings Account<br /><b>Account Holder\'s Name:</b> Neeraj Goswamy<br /><b>Bank Address :</b> D-949, New Friends Colony, New Delhi - 110065<br /><b>IFSC Code:</b> ICIC0000046 <b>MICR Code:</b> 110229007 <b>SWIFT Code:</b> ICIC IN BB FEX<br/></p>');
                     // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                },{
                    colspan: 2,
                    text: 'Wire Transfer 2',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments via Wire Transfer', '<h2>WIRE TRANSFER</h2><p>You can send your payment by Wire transfer to our HDFC Bank account held at New Delhi</p><p style="margin-left:20"><b>Beneficiary Name:</b> NEERAJ GOSWAMY <b>Bank Name:</b> HDFC BANK<br /><b>Beneficiary Account Number:</b> 04801000036692 <b>Account Type:</b> Savings Account<br /><b>Account Holder\'s Name:</b> Neeraj Goswamy<br /><b>Bank Address :</b> Plot No 9, H & J Block, Local Shopping Centre, Sarita Vihar, New Delhi - 110076<br /><b>IFSC Code:</b> HDFC0000480 <b>MICR Code:</b> 110240072 <b>Branch Code:</b> 000480<br/></p>');
                      Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                },{
                    colspan: 2,
                    text: 'Demand Draft',
                    handler: function(){
                	  Ext.Msg.alert('How to make Payments by Demand Draft', '<h2>AT-PAR CHEQUE / DEMAND DRAFT</h2><p>You can prepare a Demand Draft / Pay Order drawn in favour of <b>NEERAJ GOSWAMY</b> and payable at par at <b>NEW DELHI</b> and courier it to the following address:</p><p style="margin-left:20">Neeraj Goswamy, C-132, Sarita Vihar, New Delhi 110076, India</p><h4>Outstation cheques are not accepted</h4>');
                      Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                    },
                    scale: 'small',
                    width: 130
                } */]
            }
        }
    }, '-', {
        text: 'Send Message',
        //url: 'mailto://ngoswamy@hotmail.com',
        handler: showContactForm,
        tooltip: 'This link will open Message Window'
    });
/*
    // add a combobox to the toolbar
    var combo = Ext.create('Ext.form.field.ComboBox', {
        hideLabel: true,
        store: store,
        displayField: 'state',
        typeAhead: true,
        mode: 'local',
        triggerAction: 'all',
        emptyText:'Select a state...',
        selectOnFocus:true,
        width:135
    });
    tb.add(combo); */
    tb.suspendLayout = false;
    tb.doLayout();

    // functions to display feedback
    /*function onButtonClick(btn){
        Ext.example.msg('Button Click','You clicked the "{0}" button.', btn.text);
    }

    function onItemClick(item){
        Ext.example.msg('Menu Click', 'You clicked the "{0}" menu item.', item.text);
    }
    */
    function onItemCheck(item, checked){
        Ext.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }
    function displayw(item, checked){
    	Ext.example.msg('Topic Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    	var desc='';
    	if(item.text == 'Big Data' )
    		desc = 'It includes data sets with sizes beyond the ability of commonly-used software tools to capture, manage, and process the data within a tolerable elapsed time.';
    	else if(item.text == 'Servlets' )
    		desc = 'A servlet is a Java programming language class used to extend the capabilities of servers that host applications accessed via a request-response programming model. Although servlets can respond to any type of request, they are commonly used to extend the applications hosted by Web servers.';
    	else if(item.text == 'Spring Framework')
    		desc = 'The Spring Framework is an open source application framework for the Java platform.Central to the Spring Framework is its Inversion of Control container, which provides a consistent means of configuring and managing <i>Java objects</i> using reflection.';
    	else if(item.text == 'Java Server Faces')
    		desc = 'JavaServer Faces (JSF) is a Java-based Web application framework intended to simplify development integration of web-based user interfaces. JSF is a request-driven MVC web framework based on component-driven UI design model, using XML files called view templates or <i>Facelets</i> views.';
    	else if(item.text == 'Struts Framework')
    		desc = 'Apache Struts is an open-source web application framework for developing Java EE web applications. It uses and extends the Java Servlet API to encourage developers to adopt a <i>model-view-controller (MVC)</i> architecture.';
     if(checked){
    	Ext.create('Ext.window.Window', {
    	    title: item.text, //'Java Topics',
    	   // height: 200,
    	    width: 460,
    	    closable: true,
    	    layout: 'fit',
    	    items: {  // Let's put an empty grid in just to illustrate fit layout
    	        html: desc //'Hello'
    	    }
    	}).show();
     }
    }
    function onItemToggle(item, pressed){
    	if(pressed){
    	   tb.items.get('disablethis').enable();
           Ext.example.msg('Access Enabled', 'Button "{0}" was toggled to {1}.', item.text, pressed);
    	} else {
    		tb.items.get('disablethis').disable();
            Ext.example.msg('Access Disabled', 'Button "{0}" was toggled to {1}.', item.text, pressed);	
    	}
    }

});

