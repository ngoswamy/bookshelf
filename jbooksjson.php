<?php
 session_start();
if(@!session_is_registered("myusername")){
header("location:main_login.php");
}
$start=$_GET["start"];
$count=$_GET["limit"];
$listnames = array();
$index=0;
$thelist='';
if ($handle = opendir("C:/books")) {
//if ($handle = opendir("/www/99k.org/b/o/o/bookshelf/htdocs/books_java")) {
//if ($handle = opendir("/home/booksh3/public_html/books_java")) {
   while (false !== ($file = readdir($handle)))
      { 
          if ($file != "." && $file != "..")
	     {
		    $item = array();
	  	    $filename= basename($file, '.pdf');
			$item['id']= $index;
			$item['bookname']=$filename;
	  	    $listname[$index]= $item;
	  	    $index +=1;
          }
       } 
	  // $index -=1;
	  $pagelistname= array();
	  for($ind=0;($ind<$count &&($start+$ind) < $index);$ind++)
	  {
	     $pagelistname[$ind]=$listname[$start+$ind];
	  }
	   echo  '{success:true, total: '. $index.',rows:'.json_encode($pagelistname).'}';
  closedir($handle);
  //phpinfo();
  }
 else {
      echo '{success:false}';
 }
?>