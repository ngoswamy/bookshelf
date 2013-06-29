<?php
ob_start();
$host="localhost"; //bookshelf.99k.org"; // "bookshelf.vpsq.net" // Host name localhost
$username="root"; //603844_root"; // "booksh3_root"// Mysql username "root"
$password=""; //crackitpass1999"; //"vidhicrackpass2011" // Mysql password ""
$db_name="test"; //bookshelf_99k_test"; //"booksh3_test" // Database name test
$tbl_name="members"; // Table name

// Connect to server and select databse.
//-mysql_connect("$host", "$username", "$password")or die("cannot connect");
//-mysql_select_db("$db_name")or die("cannot select DB");

// Define $myusername and $mypassword
$myusername=$_POST['myusername'];
$mypassword=$_POST['mypassword'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
//-$myusername = mysql_real_escape_string($myusername);
//-$mypassword = mysql_real_escape_string($mypassword);

//-$sql="SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
//-$result=mysql_query($sql);

// Mysql_num_row is counting table row
//$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row
if(($myusername == "guest" && $mypassword == "welcome") || ($myusername == "neeraj" && $mypassword == "1234")){
	$count = 1;
}
else {
	$count=2;
}
if($count==1){
// Register $myusername, $mypassword and redirect 
session_register("myusername");
session_register("mypassword");
header("location:listofbooks.php?uname=".$myusername);
}
else {
echo "Wrong Username or Password";
}

ob_end_flush();
?>