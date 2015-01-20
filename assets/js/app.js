var App = {

	/**
	 * Initialize the application
	 */
	init: function() {
		if(!('Crypto' in window && 'Promise' in window)) {
			$('.alert-error')
				.text('Sorry, your browser does not support native cyrptography. We recommend upgrading to the latest Firefox.')
				.show();
			return;
		}
		openpgp.initWorker(home + 'assets/js/openpgp.worker.min.js');
		openpgp.config.show_version = false;
		openpgp.config.show_comment = false;
	},

};
