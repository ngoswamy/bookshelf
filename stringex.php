<?php
  $guy= array('name'=> 'Neeraj', 'age'=>42);
  echo $guy['name'].' age is '.$guy['age'].' years<br/>';
  $gal= array('name'=>'Ruchi', 'age'=>33);
  echo $gal['name'].' is Neeraj\'s wife who is '.$gal['age'].' years old';
  $file='abc nms.pdf';
  echo basename($file, '.pdf');
?>