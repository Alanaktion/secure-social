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
	},

	//! Application development tests
	test: {

		//! Last generated PGP key
		key: {},

		/**
		 * Generate a PGP key and show an alert with the result
		 */
		keygen: function() {
			var options = {
				numBits: 2048,
				userId: 'Test User <test@example.org>',
				passphrase: 'letmein'
			};
			openpgp.key.generate(options).then(function(data) {
				App.test.key = data;
				$('.alert-success').html('<p>Generated key with fingerprint: ' + data.primaryKey.fingerprint + '</p>')
					.show()
					.after('<pre>' + data.toPublic().armor() + '</pre>')
					.after('<pre>' + data.armor() + '</pre>');
				console.log(data);
			});
		},

		/**
		 * Encrypt a test message
		 */
		message: function() {
			var str = "This is a test message.";
			var publicKey = openpgp.key.readArmored(App.test.key.toPublic().armor());
			openpgp.encryptMessage(publicKey.keys, str).then(function(data) {
				console.log(data);
			}, function(data) {
				console.error("FAIL!");
				console.error(data);
			});
		}

	}

};

var User = {
	id: "",
	publicKey: "",
	privateKey: "",
};
