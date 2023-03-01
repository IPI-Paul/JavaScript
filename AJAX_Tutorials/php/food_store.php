<?php
  header('Content-Type: text/xml');
  echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

  echo '<response>';
    $food = htmlentities($_GET['food']);
    $foodArray = array('tuna', 'bacon', 'beef', 'loaf', 'ham');
    if (in_array(strtolower($food), $foodArray)) {
      echo htmlentities('We do have '.$food.'!');
    } else if ($food == '') {
      echo htmlentities('Enter a food you idiot');
    } else {
      echo htmlentities('Sorry punk we don\'t sell no '.$food.'!');
    }
  echo '</response>';
?>