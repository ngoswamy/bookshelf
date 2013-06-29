<?php
 session_start();
if(@!session_is_registered("myusername")){
header("location:main_login.php");
}
$listnames = array();
$index=1;
$thelist='';
if ($handle = opendir("C:/books")) {
//if ($handle = opendir("/www/99k.org/b/o/o/bookshelf/htdocs/books")) {
//if ($handle = opendir("/home/booksh3/public_html/books")) {
   while (false !== ($file = readdir($handle)))
      { 
          if ($file != "." && $file != "..")
	  {
	  	    $filename= basename($file, '.pdf');
	  	    $listname[$index]= $filename;
	  	    $index +=1;
          	$thelist .= '<a href="http://localhost/first/books/'.$file.'">'.$filename.'</a><br/>';
            //$thelist .= '<a href="http://bookshelf.99k.org/books/'.$file.'">'.$filename.'</a><br/>';
            //$thelist .= '<a href="http://box12.host1free.com/~booksh3/books/'.$file.'">'.$filename.'</a><br/>';
          }
       } 
  closedir($handle);
  //phpinfo();
  }
?>
<link rel="stylesheet" type="text/css" href="css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/example.css" />
<script type="text/javascript" src="js/ext-all.js"></script>
<script type="text/javascript" src="js/examples.js"></script>
<script>
var morebooks=false;
</script>
<body background="images/html_background.jpg">
<script>
function callback(json){
	//Ext.Msg.alert("Response",json);
}
</script>
<?php 
$user=$_GET["uname"];
echo "<script src='http://neerajgoswamy2012.appspot.com/logvisitor?username=".$user."'></script>";
echo '<script type="text/javascript">';
echo "var u_name='$user'\n";
if($user == "guest")
{
	$_SESSION["guest"]="guest";
    //session_register("guest");
} else {
	echo "morebooks=true";
}
echo '</script>';
?>
<script type="text/javascript" src="js/book.js"></script>
<noscript>
<P>List of Books:</p>
<P><?php  echo $thelist ?></p>
<br/><a href="http://localhost/first/listmorebooks.php">more</a>
<!-- br/><a href="http://bookshelf.99k.org/listmorebooks.php">more</a -->
<!-- br/><a href="http://box12.host1free.com/~booksh3/listmorebooks.php">more</a -->
<br/><!-- logout -->
<br/><!--  -->
<a href="/first/logout.php">Logout</a>
<!-- a href="http://bookshelf.99k.org/logout.php">Logout</a -->
<!--  a href="http://box12.host1free.com/~booksh3/logout.php">Logout</a -->
</noscript>
</body>