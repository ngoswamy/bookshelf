<?php 
/* session_start();
if(@!session_is_registered("myusername")){
header("location:main_login.php");
}
if(@session_is_registered("guest")){
header("location:main_login.php");
} */
$host="localhost"; //bookshelf.99k.org"; // "bookshelf.vpsq.net" // Host name localhost
$username="root"; //603844_root"; // "booksh3_root"// Mysql username "root"
$password=""; //crackitpass1999"; //"vidhicrackpass2011" // Mysql password ""
$db_name="test"; //bookshelf_99k_test"; //"booksh3_test" // Database name test
//$tbl_name="messages"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");
$name = $_POST["firstname"].' '.$_POST["middleinitial"].' '.$_POST["lastname"];
$email = $_POST["email_id"];
$subject = $_POST["subject"];
$message = $_POST["message"];
$result=mysql_query("INSERT INTO messages(name,email,subject,message) VALUES('$name','$email','$subject','$message')");
//@mail("ngoswamy@hotmail.com","Mail from Bookshelf","Name: $name From: $email Subject: $subject Message: $message");
//$result=mysql_query("SELECT * FROM $tbl_name");
//$rows = array();
//while($r = mysql_fetch_assoc($result)) {
//    $rows[] = $r;
//}

echo '{success:true}';
?>