/**
 * Core application functions and objects
 * @type {Object}
 */
var App = {

	/**
	 * Initialize the application
	 */
	init: function() {
		if(window.Crypto && window.Promise && window.localStorage) {
			openpgp.initWorker(home + 'assets/js/openpgp.worker.min.js');
			openpgp.config.show_version = false;
			openpgp.config.show_comment = false;
		} else {
			$('.alert-error')
				.text('Sorry, your browser is not supported. We recommend upgrading to the latest Firefox.')
				.show();
			return;
		}
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			// File stuff is supported, neat.
		} else {
			App.file.disable();
			console.log("HTML5 File API is not available, no support for image uploading.");
		}
		if(!document.createElement('canvas').getContext) {
			console.log("Canvas is not available, no support for image display.");
		}
	},

	/**
	 * Image manipulation helper functions
	 * @type {Object}
	 */
	img: {

		/**
		 * Crop and scale to a square
		 * @param  {Image} img
		 * @param  {Integer} dim
		 * @param  {String} type ('image', 'string', 'canvas')
		 * @return {Image|String|Canvas}
		 */
		square: function(img, dim, type) {
			var canvas = document.createElement('canvas'),
				ctx = canvas,
				x = 0,
				y = 0;

			// Scale
			if (img.height > img.width) {
				img = App.img.scale(img, dim, 0);
				y = -(img.height - dim) / 2;
			} else {
				img = App.img.scale(img, 0, dim);
				x = -(img.width - dim) / 2;
			}

			// Crop
			canvas.width = dim;
			canvas.height = dim;
			canvas.getContext('2d').drawImage(img, x, y);

			switch(type) {
				case 'string':
					return canvas.toDataURL('image/png');
				case 'canvas':
					return canvas;
			}
			return App.img.toImage(canvas);
		},

		/**
		 * Scale an image to fit a width/height
		 *
		 * Only one of the w/h params should be given, use 0 for the other.
		 *
		 * @param  {Image} img
		 * @param  {Integer} w
		 * @param  {Integer} h
		 * @param  {String} type ('image', 'string', 'canvas')
		 * @return {Image|String|Canvas}
		 */
		scale: function(img, w, h, type) {
			var canvas = document.createElement('canvas'),
				oc = document.createElement('canvas');

			if(w) {
				canvas.width = w;
				canvas.height = w * (img.height / img.width);
			} else {
				canvas.height = h;
				canvas.width = h * (img.width / img.height);
			}

			oc.width = img.width * 0.5;
			oc.height = img.height * 0.5;
			oc.getContext('2d').drawImage(img, 0, 0, oc.width, oc.height);

			canvas.getContext('2d').drawImage(oc, 0, 0, oc.width, oc.height,
					0, 0, canvas.width, canvas.height);

			switch(type) {
				case 'string':
					return canvas.toDataURL('image/png');
				case 'canvas':
					return canvas;
			}
			return App.img.toImage(canvas);
		},

		/**
		 * Convert an Image to a canvas
		 * @param  {Image} img
		 * @return {Canvas}
		 */
		toCanvas: function(img) {
			var canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			canvas.getContext("2d").drawImage(img, 0, 0);
			return canvas;
		},

		/**
		 * Convert a canvas to an Image
		 * @param  {Canvas} canvas
		 * @return {Image}
		 */
		toImage: function(canvas) {
			var img = new Image();
			img.src = App.img.toURL(canvas);
			return img;
		},

		/**
		 * Convert a data URL to an Image
		 * @param  {String} url
		 * @return {Image}
		 */
		fromURL: function(url) {
			var img = new Image();
			img.src = url;
			return img;
		},

		/**
		 * Converts an image to a data URL
		 * @param  {Image|Canvas} img
		 * @param  {String} img
		 * @param  {String} type
		 * @return {String}
		 */
		toURL: function(img, type) {
			if(!type) {
				type = 'png';
			}
			if(img instanceof Image) {
				img = App.img.toCanvas(img);
			}
			return img.toDataURL('image/' + type);
		},

	},


	/**
	 * File loading and processing helper functions
	 * @type {Object}
	 */
	file: {

		/**
		 * Last selected FileList
		 * @type {Array}
		 */
		files: [],

		/**
		 * Disable all file inputs
		 */
		disable: function() {
			$('input[type=file]').prop('disabled', true);
		},

		/**
		 * Convert a File to a binary string
		 * @param  {Blob|File} file
		 * @param  {Callback} callback
		 */
		toBinaryString: function(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(reader.result);
			};
			reader.readAsBinaryString(file);
		},

		/**
		 * Convert a File to a data URL
		 * @param  {Blob|File} file
		 * @param  {Callback} callback
		 */
		toURL: function(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(reader.result);
			};
			reader.readAsDataURL(file);
		},

	},

};
