//alert(js_array[0]);
//Ext.MessageBox.prompt('List',js_array,function(){});
/*var store = new Ext.data.JsonStore({
    // store configs
    autoDestroy: true,
    storeId: 'myStore',

    proxy: {
        type: 'ajax',
        url: 'booksjson.php',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'id'
        }
    },

    //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
    fields: ['id', 'bookname']
});*/
// Set up a model to use in our Store
Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'bookname',  type: 'string'}
    ]
});
/*
new Ext.data.proxy.JsonP({
	url: 'http://neerajgoswamy2012.appspot.com/logvisitor?username='+u_name,
	callbackKey: 'theCallbackFunction'
});
Ext.Ajax.request({
    
    params: {
        id: 1
    },
    success: function(response){
        var text = response.responseText;
        Ext.Msg.alert("Success",text);
        // process server response here
    }
}); */
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
var itemsPerPage = 10;  
var store = Ext.create('Ext.data.Store', {
    model: 'User',
    pageSize: itemsPerPage,  
    proxy: {
        type: 'ajax',
        url : '/first/booksjson.php',
       // url : '/booksjson.php',
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
/*var store = new Ext.data.Store({
url: 'http://localhost/first/booksjson.php',
reader: new Ext.data.JsonReader({
root:'rows',
id:'id'
}, [
'id', //{name:'id', type:'int'},
'bookname'
])
});
store.load();
*var book;
var booklist = new Array();
for(var i=1;i<js_array.length;i=i+1){
	book  = new Array();
	book[0]= js_array[i];
	booklist[i-1]= book;
}
var store = Ext.create('Ext.data.ArrayStore', {
    // store configs
    autoDestroy: true,
    storeId: 'myStore',
    data: booklist,
    //totalProperty: 'totalCount',
    // reader configs
    idIndex: 0,
    fields: [ 'bookname' ]
});
*
var pagingToolbar = { //1
xtype : 'paging',
store : store,
pageSize : 5,
displayInfo : true,
displayMsg: 'Displaying books {0} - {1} of {2}',
emptyMsg: "No books to display"
} */
Ext.create('Ext.grid.Panel', {
    title: 'Bookshelf',
    preventHeader: true,
    store: store,
    columns: [
        { header: 'Book Name',  dataIndex: 'bookname', width:400 },
        { header: 'Download', dataIndex: 'bookname', flex:1, sortable: false, renderer: function(value){return Ext.String.format('<a href="http://localhost/first/books/{0}.pdf" target="_blank">Link</a>', value); }}
       // { header: 'Download', dataIndex: 'bookname', flex:1, sortable: false, renderer: function(value){return Ext.String.format('<a href="http://bookshelf.99k.org/books/{0}.pdf" target="_blank">Link</a>', value); }}
     // { header: 'Download', dataIndex: 'bookname', flex:1, sortable: false, renderer: function(value){return Ext.String.format('<a href="http://box12.host1free.com/~booksh3/books/{0}.pdf" target="_blank">Link</a>', value); }}
    ],
    tbar: [{
        text: 'Yahoo',
        width: 75,
        url: 'http://www.yahoo.com', 
        tooltip: 'This link will take you to Yahoo site'
    },'-', {
        text: 'Google Search',
        width: 80,
        url: 'http://www.google.co.in', 
        tooltip: 'This link will take you to Google Search'
    },'-', {
        text: 'Sencha',
        width: 75,
        url: 'http://www.sencha.com', 
        tooltip: 'This link will take you to Sencha and Extjs'
    },'-', {
        text: 'Java',
        width: 75,
        url: 'http://java.sun.com', 
        tooltip: 'This link will take you to Java Site'
    },'-', 
          { xtype: 'button', id: 'disableme', width:75, text: 'next', handler: function(){ if(morebooks){ window.top.location.href = 'http://localhost/first/listmorebooks.php';} else {/*Ext.get('disableme').disable;*/ Ext.example.msg('Members Only', 'You need membership to <br/>access more features on<br/> this site');} }},
         // { xtype: 'button', id: 'disableme', width:75, text: 'next', handler: function(){ if(morebooks){ window.top.location.href = 'http://bookshelf.99k.org/listmorebooks.php';} else {/*Ext.get('disableme').disable;*/ Ext.example.msg('Members Only', 'You need membership to <br/>access more features on<br/> this site');} }},	  
          '-',{
              text: 'Payments',
              width: 75,
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
                      } */]
                  }
              }
          },'-',
          { xtype: 'button', text: 'Logout', width:80, handler: function(){ window.top.location.href = 'http://localhost/first/logout.php';} }
         // { xtype: 'button', text: 'Logout', width:80, handler: function(){ window.top.location.href = 'http://bookshelf.99k.org/logout.php';} }
       // { xtype: 'button', text: 'Logout', handler: function(){ window.top.location.href = 'http://box12.host1free.com/~booksh3/logout.php';} }
          , '-', {
              text: 'Send Message',
              //width: 87,
              //url: 'mailto://ngoswamy@hotmail.com',
              handler: showContactForm,
              tooltip: 'This link will open Message Window'
          }],
    //bbar: pagingToolbar,
    //height: 400,
    width: 700,
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: store,   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }/*,
    {
    	xtype: 'toolbar',
    	items: [{ xtype: 'label',
    	text: 'Search', width:50},
    	{xtype    : 'textfield',
            name     : 'field1',
            emptyText: 'enter search term'},
            { text:'Go', handler: function(){
              store.filter('name',this.up('toolbar').getChildByElement('field1').value);
            }
            }]
    }*/],
    renderTo: Ext.getBody() //Ext.get("gridview") // Ext.getBody()
});