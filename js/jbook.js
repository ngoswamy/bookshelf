// Set up a model to use in our Store
Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'bookname',  type: 'string'}
    ]
});
Ext.define('Defs', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'definition',  type: 'string'}
    ]
});
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
var itemsPerPage = 7;  
var store = Ext.create('Ext.data.Store', {
    model: 'User',
    pageSize: itemsPerPage,  
    proxy: {
        type: 'ajax',
        url : '/first/jbooksjson.php',
       // url : '/jbooksjson.php',
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total'
        }
    },
    autoLoad: false
});
store.load({
    params:{
        start:0,
        limit: itemsPerPage
    }
});
var defsstore = Ext.create('Ext.data.Store', {
    // store configs
	model: 'Defs',
    //autoDestroy: true,
    storeId: 'myDefsStore',
    proxy: {
	   type: 'ajax',
	   url : '/first/getdefs.php',
	   //url: '/getdefs.php',
	   reader: {
		    type: 'json',
		    root: 'rows'
	   }
	},
	autoload: false
    //data: booklist,
    //totalProperty: 'totalCount',
    // reader configs
    //idIndex: 0,
    //fields: [ 'bookname' ]
});
defsstore.load();
function showdef(item){
	return item; //'<a href="onclick:definition("'+item+'");">'+item+'</a>';
/*	Ext.Msg.show({
		title: item,
	    // msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
	     buttons: Ext.Msg.YESNOCANCEL,
	    // icon: Ext.Msg.QUESTION
	   loader:  {
		        url: 'defs/'+item+'.txt',
		        renderer: 'html',
		        //params: {
		        //    userId: 1
		        //}
		    }
	});*/
}
function javasite(btn) {
	Ext.create('Ext.window.Window', {
	    title: 'Java Terms',
	    height: 200,
	    width: 460,
	    closable: true,
	    layout: 'fit',
	    items: {  // Let's put an empty grid in just to illustrate fit layout
	        xtype: 'grid',
	        border: false,
	        columns: [{header: 'Terms of Interest', dataIndex: 'name', width: 100},
	                  {header: 'Definition', dataIndex: 'definition', width: 348}
	                  ],                 // One header just for show. There's no data,
	        store: defsstore,
	        autoScroll: true
	        	/*Ext.create('Ext.data.ArrayStore', {
	        	autoDestroy: true,
	            storeId: 'myStore',
	            data: [['Servlets'],['Enterprise Java Beans']], //,['JavaBeans'],['Java Server Pages']],
	            // reader configs
	            idIndex: 0,
	            fields: [ 'areaname' ]
	        }) // A dummy empty data store */
	    }
	}).show();

	//Ext.Msg.alert('Status', 'Changes saved successfully.');
}

Ext.create('Ext.grid.Panel', {
    title: 'Bookshelf',
    preventHeader: true,
    store: store,
    columns: [
        { header: 'Book Name',  dataIndex: 'bookname', width:400 },
        { header: 'Download', dataIndex: 'bookname', flex:1, sortable: false, renderer: function(value){return Ext.String.format('<a href="http://localhost/first/books/{0}.pdf" target="_blank">Link</a>', value); }}
       // { header: 'Download', dataIndex: 'bookname', flex:1, sortable: false, renderer: function(value){return Ext.String.format('<a href="http://bookshelf.99k.org/books_java/{0}.pdf" target="_blank">Link</a>', value); }}
    ],
    tbar: [{
        text: 'Yahoo',
        width: 45,
        url: 'http://www.yahoo.com', 
        tooltip: 'This link will take you to Yahoo site'
    },'-', {
        text: 'Google Search',
        width: 80,
        url: 'http://www.google.co.in', 
        tooltip: 'This link will take you to Google Search'
    },'-', {
        text: 'Hadoop',
        width: 48,
        handler: function(){
    	
    	Ext.create('Ext.window.Window', {
    	    title: 'Hadoop', //'Java Topics',
    	   // height: 200,
    	    width: 460,
    	    closable: true,
    	    layout: 'fit',
    	    items: {  // Let's put an empty grid in just to illustrate fit layout
    	        html: '<p><i>Apache Hadoop</i> is a scalable, fault-tolerant system<br/> for data storage and processing. Hadoop is economical and reliable, <br/> which makes it perfect to run data-intensive<br/> applications on commodity hardware</p><p>Hadoop excels at doing complex analyses, including<br/> detailed, special-purpose computation, across large collections of data.<br/></p><p> Hadoop handles <ul><li> -search</li><li> -log processing</li><li> -recommendation systems</li><li> -data warehousing and </li><li> -video/image analysis</li></ul></p><a href="http://hadoop.apache.org" target="_blank">More on Hadoop</a>' //'Hello'
    	    }
    	}).show();
    	
        },
       // url: 'http://www.sencha.com', 
        tooltip: 'This link will describe Hadoop and MapReduce'
    },'-', {
        text: 'Java',
        width: 40,
        url: 'http://java.sun.com', 
        tooltip: 'This link will take you to Java Site'
    },'-',
          { xtype: 'button', text: 'previous', width:65, handler: function(){ window.top.location.href = 'http://localhost/first/listofbooks.php';} }, '-',
        //  { xtype: 'button', text: 'previous', width:65, handler: function(){ window.top.location.href = 'http://bookshelf.99k.org/listofbooks.php';} }, '-',	  
          {
              text: 'Payments',
              width: 65,
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
                      } /* {
                          colspan: 2,
                          text: 'Local Cheque 1',
                          handler: function(){
                      	  Ext.Msg.alert('How to make Payments by Local Cheque', '<h2>LOCAL CHEQUE DEPOSIT AT A BRANCH OF HDFC BANK IN YOUR CITY</h2><p>If your city has a branch of HDFC Bank, you can pay by local cheque. Prepare a cheque drawn in favour of <b>Neeraj Goswamy</b> and deposit the same in your city\'s HDFC Bank branch to HDFC Bank Savings Account No. <b>04801000036692</b> (held at New Delhi).</p><p>After depositing the cheque, send an email to ngoswamy@hotmail.com quoting your Name, Address, Cheque number, Cheque amount, HDFC bank branch name and City where deposited.</p><h4>Outstation cheques are not accepted</h4>');
                           // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
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
                           // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                          },
                          scale: 'small',
                          width: 130
                      },{
                          colspan: 2,
                          text: 'Demand Draft',
                          handler: function(){
                      	  Ext.Msg.alert('How to make Payments by Demand Draft', '<h2>AT-PAR CHEQUE / DEMAND DRAFT</h2><p>You can prepare a Demand Draft / Pay Order drawn in favour of <b>NEERAJ GOSWAMY</b> and payable at par at <b>NEW DELHI</b> and courier it to the following address:</p><p style="margin-left:20">Neeraj Goswamy, C-132, Sarita Vihar, New Delhi 110076, India</p><h4>Outstation cheques are not accepted</h4>');
                           // Ext.example.msg('Contact Address','ngoswamy@hotmail.com');
                          },
                          scale: 'small',
                          width: 130
                      } */ ]
                  }
              }
          },'-',
          { xtype: 'button', text: 'Java Terms', width:70, handler: javasite }, '-',
          { xtype: 'button', text: 'The Server Side', width:80, url: 'http://www.theServerSide.com' }, '-',
          { xtype: 'button', text: 'Logout', width:60, handler: function(){ window.top.location.href = 'http://localhost/first/logout.php';} }
         // { xtype: 'button', text: 'Logout', width:60, handler: function(){ window.top.location.href = 'http://bookshelf.99k.org/logout.php';} }
          , '-', {
              text: 'Send Message',
              //url: 'mailto://ngoswamy@hotmail.com',
              handler: showContactForm,
              tooltip: 'This link will open Message Window'
          }],
    width: 720,
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: store,   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }],
    renderTo: Ext.getBody() //Ext.get("gridview") // Ext.getBody()
});
/*
var html = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, '+
'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, '+
'lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis '+
'vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>'+
'Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing '+
'eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt '+
'diam nec urna. Curabitur velit. Lorem ipsum dolor sit amet.</p>';
var configs = [{
    title: 'Basic Panel',
    collapsible:true,
    width:720,
    html: html
 },{
    title: 'Basic Panel2',
    collapsible:true,
    width:720,
    html: html
 }];
Ext.each(configs, function(config) {
 var element = Ext.getBody().createChild({cls: 'panel-container'});

 Ext.createWidget('panel', Ext.applyIf(config, {
    renderTo: element,
    bodyPadding: 7
 }));
}); */