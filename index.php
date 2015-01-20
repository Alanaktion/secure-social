<?php

$f3=require('lib/base.php');

$f3->set('DEBUG',1);
if ((float) PCRE_VERSION < 7.9) {
	trigger_error('PCRE version is out of date');
}

$f3->mset(array(
	"AUTOLOAD" => "app/",
	"UI" => "app/view/",
	"HOME" => $f3->get("SCHEME") . "://" . $f3->get("HOST") . $f3->get("BASE") . "/",
));

$f3->config('config.ini');
$f3->config('app/routes.ini');

$f3->run();
