<?php

require_once("twitteroauth.php");

function twitter()
{

$twitterID = (isset($_REQUEST['twitterUsername']) && !empty($_REQUEST['twitterUsername']))?$_REQUEST['twitterUsername']:"azinakou";
$tweetNum = 50;
$consumerKey = "EGw3aE9zvQY58FBfSBB0dS1VE";
$consumerSecret = "whR5z5sCUjdubHRWWNZBQyot0lAs9CGdvtPpAh94J6WA1ITzEJ";
$accessToken = "144136235-5lRr1Ry7UD1IjZhUyCXx6FoDotlczEFbvWgvTOMK";
$accessTokenSecret = "plwL9v1V5a1VudBzWwbxmb6cRDWpHLodpoWr0MEpf187j"; 
if($twitterID && $consumerKey && $consumerSecret && $accessToken && $accessTokenSecret) {
      //Authentication with twitter
      $twitterConnection = new TwitterOAuth(
          $consumerKey,
          $consumerSecret,
          $accessToken,
          $accessTokenSecret
      );
      //Get user timeline feeds
      $twitterData = $twitterConnection->get(
          'statuses/user_timeline',
          array(
              'screen_name'     => $twitterID,
              'count'           => $tweetNum,
              'exclude_replies' => false
          )
      );
      
    }

    $twitterfeed = json_encode($twitterData);
    
    return $twitterData;
}