<?php

namespace Controller;

class Index {

	public function index($f3) {
		echo \Template::instance()->render("index.html");
	}

	public function test($f3) {
		echo \Template::instance()->render("test.html");
	}

	public function minify($f3, $params) {
		if($params["type"] == "js-vendor") {
			$f3->set("UI", "assets/js/vendor/");
		} else {
			$f3->set("UI", "assets/" . $params["type"] . "/");
		}
		echo \Web::instance()->minify($params["files"]);
	}

	public function join($f3, $params) {
		if($f3->get("AJAX")) {
			// Register user
			return;
		}
		echo \Template::instance()->render("join.html");
	}

	public function auth($f3, $params) {
		if(!$f3->get("AJAX")) {
			return;
		}
	}

}
