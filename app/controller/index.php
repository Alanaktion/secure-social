<?php

namespace Controller;

class Index {

	public function index() {
		echo \Template::instance()->render("index.html");
	}

	public function minify($f3, $params) {
		$f3->set("UI", "assets/" . $params["type"] . "/");
		echo \Web::instance()->minify($params["files"]);
	}

}
