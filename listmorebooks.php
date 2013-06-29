<?php
 session_start();
if(@!session_is_registered("myusername")){
header("location:main_login.php");
}
if(@session_is_registered("guest")){
header("location:main_login.php");
}
$listnames = array();
$index=1;
$thelist='';
if ($handle = opendir("C:/books")) {
//if ($handle = opendir("/www/99k.org/b/o/o/bookshelf/htdocs/books_java")) {
//if ($handle = opendir("/home/booksh3/public_html/books_java")) {
   while (false !== ($file = readdir($handle)))
      { 
          if ($file != "." && $file != "..")
	  {
	  	    $filename= basename($file, '.pdf');
	  	    $listname[$index]= $filename;
	  	    $index +=1;
          	$thelist .= '<a href="http://localhost/first/books/'.$file.'">'.$filename.'</a><br/>';
            //$thelist .= '<a href="http://bookshelf.99k.org/books_java/'.$file.'">'.$filename.'</a><br/>';
            //$thelist .= '<a href="http://http://box12.host1free.com/~booksh3/books_java/'.$file.'">'.$filename.'</a><br/>';
          }
       } 
  closedir($handle);
  //phpinfo();
  }
?>
<link rel="stylesheet" type="text/css" href="css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/example.css" />
<script type="text/javascript" src="js/ext-all.js"></script>
<body background="images/html_background.jpg">
<script type="text/javascript" src="js/jbook.js"></script>
<noscript>
<P>List of Books:</p>
<P><?php  echo $thelist ?></p>
<br/><!-- logout -->
<br/><!--  -->
<a href="/first/logout.php">Logout</a>
<!--  a href="http://bookshelf.99k.org/logout.php">Logout</a -->
<!--  a href="http://box12.host1free.com/~booksh3/logout.php">Logout</a -->
</noscript>
</body>