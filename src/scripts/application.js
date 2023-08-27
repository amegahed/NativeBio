/******************************************************************************\
|                                                                              |
|                                application.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the top level view of the application.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

// library imports
//
import '../library/underscore/underscore.js';
import '../library/jquery/jquery-3.6.0.js';
import '../library/backbone/backbone.js';
import '../library/backbone/marionette/backbone.marionette.js';

// vendor imports
//
import '../vendor/jquery/jquery-ui/js/jquery-ui.js';
import '../vendor/jquery/jquery-bridget/jquery-bridget.js';
import '../vendor/jquery/doubletap/jquery-doubletap.js';
import '../vendor/jquery/jquery-finger/jquery.finger.js';
import '../vendor/flickity/js/flickity.pkgd.js';

// module imports
//
import Router from './router.js';
import Session from './models/users/auth/session.js';
import App from './models/apps/app.js';
import Directory from './models/files/directory.js';
import FileAssociations from './models/settings/file-associations.js';
import SystemSettings from './models/settings/system-settings.js';
import DesktopSettings from './models/settings/desktop-settings.js';
import ThemeSettings from './models/settings/theme-settings.js';
import ControlSettings from './models/settings/control-settings.js';
import DialogSettings from './models/settings/dialog-settings.js';
import NotificationSettings from './models/settings/notification-settings.js';
import SoundSettings from './models/settings/sound-settings.js';
import Apps from './collections/apps/apps.js';
import FullScreenable from './views/behaviors/layout/full-screenable.js';
import AppLoadable from './views/apps/common/behaviors/loading/app-loadable.js';
import Openable from './views/apps/common/behaviors/launching/openable.js';
import Alertable from './views/dialogs/behaviors/alertable.js';
import MainView from './views/layout/main-view.js';
import PageView from './views/layout/page-view.js';
import ModalView from './views/dialogs/modal-view.js';
import Keyboard from './views/keyboard/keyboard.js';
import Audio from './utilities/multimedia/audio.js';
import Sound from './utilities/multimedia/sound.js';
import Browser from './utilities/web/browser.js';
import CssUtils from './utilities/web/css-utils.js';

export default Marionette.Application.extend(_.extend({}, FullScreenable, AppLoadable, Openable, Alertable, {

	//
	// attributes
	//

	region: 'body',

	events: {

		// mouse events
		//
		'mousedown': 'onMouseDown',

		// keyboard events
		//
		'keydown:not([contenteditable="true"])': 'onKeyDown'
	},

	settings: {

		// system settings
		//
		system: new SystemSettings(),
		associations: new FileAssociations(),
		notifications: new NotificationSettings(),
		sound: new SoundSettings(),

		// theme settings
		//
		desktop: new DesktopSettings(),
		theme: new ThemeSettings(),
		controls: new ControlSettings(),
		dialogs: new DialogSettings()
	},
	
	defaults: config.defaults,
	sounds: [],

	//
	// constructor
	//

	initialize: function(options) {

		// set attributes
		//
		if (!options) {
			options = {};
		}
		this.options = options;
		this.apps = this.getApps();
		this.name = config.branding.name;

		// set web page title
		//
		if (config.branding.title) {
			document.title = config.branding.title;
		}

		// make Flickety a jquery plug-in
		//
		$.bridget('flickity', Flickity);

		// create new session
		//
		this.session = new Session({

			// callbacks
			//
			error: () => this.signIn()
		});

		// initialize keyboard state
		//
		this.keyboard = new Keyboard({
			el: this.$el
		});

		// listen for keyboard events
		//
		this.listenTo(this.keyboard, 'keydown', this.onKeyDown);

		// ensure all session information is forwarded by default 
		// and watch for expired or fraudluent sessions
		//
		$.ajaxSetup({
			xhrFields: {
				withCredentials: true
			}
		});

		// set ajax calls to display wait cursor while pending
		//
		$(document).ajaxStart(() => {
			$('html').attr('style', 'cursor: wait !important;');
			// $(document).trigger($.Event('mousemove'));
		}).ajaxComplete(() => {
			$('html').removeAttr('style');
			// $(document).trigger($.Event('mousemove'));
		});

		// in the event of a javascript error, reset the pending ajax spinner
		//
		$(window).on('error', () => $.event.trigger('ajaxStop'));

		// play tap sound
		//
		if (Browser.is_mobile) {
			$(document).on('tap', () => this.play('tap'));
		}

		// disable pinch zoom on touch devices
		//
		if (Browser.is_touch_enabled) {
			document.addEventListener('touchmove', (event) => {
				if (event.scale !== 1) {
					event.preventDefault();
				}
			}, false);
		}
	
		// store handle to application
		//
		window.application = this;

		// create routers
		//
		this.router = new Router();

		// after any route change, clear modal dialogs
		//
		this.router.on("route", () => {
			this.getChildView('modals').closeNonMinimized();
		});

		// create sounds
		//
		this.createSounds(Object.keys(config.sounds));
	},

	createSounds: function(names) {
		for (let i = 0; i < names.length; i++) {
			let name = names[i];
			this.sounds[name] = new Sound({
				url: config.sounds[name]
			});
		}
	},

	//
	// querying methods
	//

	isSignedIn: function() {
		return this.session && this.session.user != undefined;
	},

	isUserSignedIn: function() {
		return this.isSignedIn() && !this.session.user.isAdmin();
	},

	isBinaryTheme: function() {
		return Browser.is_firefox && !($('body').hasClass('colored'));
	},

	isMuted: function() {
		return this.settings.system.get('mute_sounds');
	},

	hasDirectory: function(name) {

		// return home directory
		//
		if (!name) {
			return this.session.home;
		}

		// create path
		//
		let path;
		if (name.endsWith('/')) {
			path = name;
		} else {
			path = name + '/';
		}

		// find directory
		//
		return this.session.home && this.session.home.hasItem(path);
	},

	hasChildView: function(name) {
		return this.getView().hasChildView(name);
	},

	isEmbedded: function() {
		return Browser.isInIFrame() && window.location.hash.startsWith('#links');
	},

	isDesktopVisible: function() {
		if (Browser.is_mobile) {
			return false;
		}
		return this.desktop && this.getChildView('modals').isEmpty();
	},

	//
	// getting methods
	//

	getChildView: function(name) {
		return this.getView().getChildView(name);
	},

	getPageOrientation: function() {
		return $(window).width() > $(window).height()? 'landscape' : 'portrait';
	},
	
	getUrl: function() {
		if (config.base_url) {
			return config.base_url + '/';
		} else {
			let protocol = window.location.protocol,
				hostname = window.location.host,
				pathname = window.location.pathname;
			return protocol + '//' + hostname + pathname;
		}
	},

	getApp: function(appName) {
		return this.apps.findWhere({
			id: appName
		});
	},

	getApps: function(filter) {
		let collection = new Apps();
		let keys = Object.keys(config.apps);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];

			// create new app model from default data
			//
			let app = new App(_.extend(config.apps[key], {
				id: key,
				app: key.replace(/_/g, '-')
			}));

			// add to collection
			//
			if (!filter || filter(app)) {
				collection.add(app);
			}
		}
		return collection;
	},

	getDirectory: function(path) {
		
		// return home directory
		//
		if (!path) {
			if (!this.session.home) {
				this.session.home = new Directory();
			}
			return this.session.home;
		}

		// make sure path ends in slash
		//
		if (!path.endsWith('/')) {
			path = path + '/';
		}

		// find directory
		//
		if (this.session.home && this.session.home.hasItem(path)) {
			return this.session.home.getItem(path);
		}

		// create directory
		//
		return new Directory({
			path: path
		});
	},

	getSound: function(kind) {
		if (this.settings.sound && this.settings.sound.has(kind)) {
			let name = this.settings.sound.get(kind);
			if (name && this.sounds[name]) {
				return this.sounds[name];
			}
		}
	},

	getMuted: function() {
		return this.settings.system.get('mute_sounds');
	},

	getVolume: function() {
		return this.settings.system.get('volume');
	},

	getActiveView: function() {

		// get focused modal
		//
		if (this.getChildView('modals').hasFocused()) {
			return this.getChildView('modals').getFocused();
		}

		// return application view
		//
		if (this.isEmbedded()) {
			return this.getView();
		}

		// get main active view
		//
		let activeView = this.getChildView('main');
		if (activeView && activeView.getActiveView) {
			activeView = activeView.getActiveView();
		}

		return activeView;
	},

	getModals: function() {
		if (this.isDesktopVisible()) {
			return this.desktop.getCurrentApp().modals;
		} else {
			return this.getChildView('modals');
		}
	},

	//
	// setting methods
	//

	setUser: function(user, done) {

		// set attributes
		//
		this.session.user = user;

		// update header
		//
		if (!this.isEmbedded()) {
			this.showHeader();
		}

		// load user application settings
		//
		if (user) {
			this.loadUserThemeSettings(user, () => {
				this.loadUserSettings(user, done);
			});
		}
	},

	setMuted: function(muted) {

		// save muted setting
		//
		this.settings.system.save({
			mute_sounds: muted
		});
	},

	setVolume: function(volume) {

		// save volume setting
		//
		this.settings.system.save({
			volume: volume
		});
	},

	//
	// loading methods
	//

	loadUserSettings: function(user, done) {

		// load system settings
		//
		this.settings.system.fetchByUser(user, {

			// callbacks
			//
			success: () => {

				// load notification settings
				//
				this.settings.notifications.fetchByUser(user, {

					// callbacks
					//
					success: () => {

						// load sound settings
						//
						this.settings.sound.fetchByUser(user, {

							// callbacks
							//
							success: () => {

								// load file associations
								//
								this.settings.associations.fetchByUser(user, {

									// callbacks
									//
									success: () => {

										// perform callback
										//
										if (done) {
											done();
										}
									},

									error: () => {
										this.error({
											message: "Could not load file associations."
										});						
									}
								});
							},

							error: () => {
								this.error({
									message: "Could not load sound settings."
								});				
							}
						});
					},

					error: () => {
						this.error({
							message: "Could not load notification settings."
						});				
					}
				});
			},

			error: () => {
				this.error({
					message: "Could not load system settings."
				});						
			}
		});	
	},

	loadUserThemeSettings: function(user, done) {

		// load theme settings
		//
		this.settings.theme.fetchByUser(user, {

			// callbacks
			//
			success: (model) => {
				model.apply();

				// load control settings
				//
				this.settings.controls.fetchByUser(user, {

					// callbacks
					//
					success: (model) => {
						model.apply();

						// load dialog settings
						//
						this.settings.dialogs.fetchByUser(user, {

							// callbacks
							//
							success: (model) => {
								model.apply();

								// perform callback
								//
								if (done) {
									done();
								}
							},

							error: () => {
								this.error({
									message: "Could not load dialog settings."
								});						
							}
						});
					},

					error: () => {
						this.error({
							message: "Could not load control settings."
						});						
					}
				});
			},

			error: () => {
				this.error({
					message: "Could not load theme settings."
				});						
			}
		});
	},

	//
	// startup methods
	//

	start: function(options) {

		// call superclass method
		//
		Marionette.Application.prototype.start.call(this, options);

		// check if we need to sign in
		//
		if (this.isEmbedded()) {
			this.startRouter();
		} else {

			// check to see if user is logged in
			//
			this.session.relogin({

				// callbacks
				//
				success: (model) => {

					// set current user
					//
					this.setUser(model);

					// start router
					//
					this.startRouter();
				},

				error: () => {
					this.startRouter();
				}
			});
		}
	},

	startRouter: function() {
		if (!Backbone.history.start({
			pushState: config.usePushState
		})) {
			this.router.showNotFound();
		}
	},

	reset: function() {

		// reset system settings
		//
		this.settings.system.reset();

		// reset theme settings
		//
		this.settings.theme.reset();
		this.settings.controls.reset();
		this.settings.desktop.reset();
		this.settings.dialogs.reset();

		// apply default theme settings
		//
		this.settings.theme.apply();
		this.settings.controls.apply();
		this.settings.desktop.apply();
		this.settings.dialogs.apply();

		// reset attributes
		//
		this.desktop = undefined;
		this.session.user = undefined;
	},

	login: function(done) {

		// get user information
		//
		this.session.getUser('current', {

			// callbacks
			//
			success: (model) => {

				// set current user
				//
				this.setUser(model, () => {
					if (done) {
						done();
					} else {
						this.onSignIn();
					}
				});

				// get current url fragment
				//
				/*
				let fragment = AddressBar.get('fragment');
				if (fragment == 'sign-in') {
					fragment = null;
				}

				// reload existing view
				//
				application.navigate(fragment || '#home', {
					trigger: true,
					reset: true
				});
				*/
			}
		});
	},

	logout: function() {

		// end session
		//
		this.session.logout({

			// callbacks
			//
			success: () => {

				// update header
				//
				if (this.getView().options.show_header) {
					this.getView().showHeader();
				}

				// call event handler
				//
				this.onSignOut();

				// reset application
				//
				this.reset();
			},
			
			error: (jqxhr, textstatus, errorThrown) => {

				// show error message
				//
				this.error({
					message: "Could not log out: " + errorThrown + "."
				});
			}
		});
	},

	//
	// rendering methods
	//

	onStart: function() {

		// show main view
		//
		this.showView(new MainView({
			keyboard: this.keyboard,
			showHeader: true
		}), {
			replaceElement: true
		});

		this.onRender();
	},

	onRender: function() {

		// set theme to match system color scheme preferences
		//
		if (this.isEmbedded()) {
			this.settings.theme.set('day_theme', Browser.color_scheme);
			this.settings.theme.set('night_theme', Browser.color_scheme);
		}

		// listen for changes to system color scheme preferences
		//
		Browser.onChangeColorScheme((colorScheme) => {
			this.settings.theme.set('day_theme', colorScheme);
			this.settings.theme.set('night_theme', colorScheme);
		});

		// set initial style
		//
		this.settings.theme.apply();
		this.settings.controls.apply();
		this.settings.dialogs.apply();

		// add helpful class for mobile OS'es
		//
		$('body').attr('device', Browser.device);
		if (Browser.device == 'phone' || Browser.device == 'tablet') {
			$('body').addClass('mobile');
		}

		// add helpful classes for browser detection
		//
		if (Browser.mobile_os) {
			$('body').attr('os', Browser.mobile_os.toLowerCase());
		}
		if (Browser.name) {
			$('body').attr('browser', Browser.name.toLowerCase());
		}
		if (Browser.os_type) {
			$('body').attr('os', Browser.os_type.toLowerCase());
		}

		// remove hover styles to avoid double tap on mobile
		//
		if (Browser.is_touch_enabled) {
			CssUtils.removeAllHoverStyles();
		}

		// listen for window resize
		//
		$(window).on('resize', (event) => {
			this.onResize(event);
		});
	},

	show: function(view, options) {
		if (view instanceof ModalView) {
			if (this.isDesktopVisible()) {

				// show view in desktop's modals
				//
				this.desktop.show(view, options);
			} else {

				// show view in global modals
				//
				this.showModal(view, options);
			}
		} else {

			// show page view
			//
			this.showMain(view, options);
		}

		return view;
	},

	showModal: function(view, options) {
		this.getChildView('modals').show(view, options);
	},

	showHeader: function() {
		if (!this.session.user) {
			this.getView().showHeader();
		} else {
			this.getView().showUserHeader(this.session.user);
		}
	},
	
	showMain: function(view, options) {

		// show page navigation
		//
		if (this.hasChildView('header')) {
			if (options && options.nav) {
				this.getChildView('header').setNav(options.nav);
			} else {
				this.getChildView('header').setNav();				
			}
		}

		// show view in main region
		//
		this.getView().showMain(view, options);

		// scroll to top
		//
		$('#main')[0].scrollTo(0, 0);
	},

	showPage: function(view, options) {
		application.desktop = null;
		
		// show page view
		//
		this.showMain(new PageView({
			className: options && options.nav? options.nav + ' page': 'page',
			contentsView: view,
			showFooter: options? options.showFooter : true,
			alignment: options? options.alignment : undefined,
			theme: options? options.theme : undefined
		}), options);
	},

	showProfilePhoto: function(imageFile) {
		this.getChildView('header').showProfilePhoto(imageFile);
	},

	setProfilePhoto: function(imageFile) {
		this.getChildView('header').setProfilePhoto(imageFile);
	},

	loadFont: function(font) {
		if (font && font != '' && config.fonts[font]) {
			let fontName = config.fonts[font]['font-family'];
			let fontUrl = config.fonts[font].url;
			if (fontUrl) {
				ThemeSettings.loadFont(fontName, fontUrl);
			}
		}
	},

	//
	// dialog rendering methods
	//

	activateDialog: function(appView, options) {

		// handle app's dialog
		//
		if (appView.dialog) {

			// unminimize dialog
			//
			if (appView.dialog.isMinimized()) {
				appView.dialog.unminimize();
			}

			// move dialog to top of stack
			//
			appView.dialog.toTop();

			// focus dialog
			//
			appView.dialog.focus();
		}

		// set app options
		//
		if (options) {
			appView.options = options;
		}

		// reset app
		//				
		if (appView.initialize) {
			appView.initialize(options);
			appView.onRender();
		}
	},

	//
	// user showing methods
	//

	showUser: function(user) {
		if (this.desktop) {
			this.launch('profile_viewer', {
				model: user
			});
		} else {
			window.location = user.getUrl();
		}
	},

	showUsers: function(users) {
		for (let i = 0; i < users.length; i++) {
			this.showUser(users[i]);
		}
	},

	//
	// social showing methods
	//

	showChat: function(chat, options) {
		if (this.desktop) {
			if (this.desktop.hasApp('messenger')) {

				// open in desktop
				//
				this.desktop.setApp('messenger', () => {
					this.desktop.getAppView('messenger').openChat(chat, options);	
				});
			} else {

				// open in new window
				//
				this.launch('messenger', _.extend({}, options, {
					model: chat
				}));
			}
		} else {

			// open in new page
			//
			window.location = chat.getUrl();
		}
	},

	showChats: function(chats, options) {
		if (this.desktop) {
			if (this.desktop.hasApp('messenger')) {

				// open in desktop
				//
				this.desktop.setApp('messenger', () => {
					this.desktop.getAppView('messenger').openChats(chats, options);
				});
			} else {

				// open in new window
				//		
				import(
					'./collections/chats/chats.js'
				).then((Chats) => {
					this.launch('messenger', _.extend({}, options, {
						collection: new Chats.default(chats)
					}));
				});
			}
		}
	},

	showPost: function(post, options) {
		if (this.desktop) {
			if (this.desktop.hasApp('messenger')) {

				// open in desktop
				//
				this.desktop.setApp('messenger', () => {
					this.desktop.getAppView('messenger').openPost(post, options);
				});
			} else {

				// open in new window
				//
				this.launch('messenger', _.extend({}, options, {
					model: post
				}));
			}
		} else {

			// open in new page
			//
			window.location = post.getUrl();
		}
	},

	showTopic: function(topic, options) {
		if (this.desktop) {
			if (this.desktop.hasApp('messenger')) {

				// open in desktop
				//
				this.desktop.setApp('messenger', () => {
					this.desktop.getAppView('messenger').openTopic(topic, options);
				});
			} else {

				// open in new window
				//
				this.launch('messenger', _.extend({}, options, {
					model: topic
				}));
			}
		} else {

			// open in new page
			//
			window.location = topic.getUrl();
		}
	},

	showTopics: function(topics, options) {
		if (this.desktop.hasApp('messenger')) {

			// open in desktop
			//
			this.desktop.setApp('messenger', () => {
				this.desktop.getAppView('messenger').openTopics(topics, options);		
			});
		} else {

			// open in new window
			//
			import(
				'./collections/topics/topics.js'
			).then((Topics) => {
				this.launch('messenger', _.extend({}, options, {
					collection: new Topics.default(topics)
				}));
			});
		}
	},

	//
	// project showing methods
	//

	showProject: function(project, options) {
		if (this.desktop) {
			if (this.desktop.hasApp('project_viewer')) {

				// open in desktop
				//
				this.desktop.setApp('project_viewer', () => {
					this.desktop.getAppView('project_viewer').openProject(project, options);	
				});
			} else {

				// open in new window
				//
				this.launch('project_viewer', _.extend({}, options, {
					model: project
				}));
			}
		} else {

			// open in new page
			//
			window.location = project.getUrl();
		}
	},

	showProjects: function(projects, options) {
		if (this.desktop.hasApp('project_viewer')) {

			// open in desktop
			//
			this.desktop.setApp('project_viewer', () => {
				this.desktop.getAppView('project_viewer').openProjects(projects, options);		
			});
		} else {

			// open in new window
			//
			import(
				'./collections/projects/projects.js'
			).then((Projects) => {
				this.launch('project_viewer', _.extend({}, options, {
					collection: new Projects.default(projects)
				}));
			});
		}
	},

	//
	// browser showing methods
	//

	showUrl: function(url, options) {
		// if (url.startsWith(this.getUrl())) {
		if (this.isFullScreen()) {
			this.launch('web_browser', {
				url: url
			});
		} else {

			// open new window or tab
			//
			window.open(url, options);
		}
	},

	//
	// launching methods
	//

	launch: function(appName, options, launchOptions) {
		this.loadAppView(appName.replace(/-/g, '_'), (AppView) => {

			// check if app was found
			//
			if (!AppView) {

				// show alert dialog
				//
				this.alert({
					message: "Application " + appName +  " not found."
				});

				// perform callback
				//
				if (launchOptions && launchOptions.error) {
					launchOptions.error();
				}

			// launch app
			//
			} else {
				this.launchApp(appName, AppView, options, launchOptions);
			}
		});
	},

	launchApp(appName, AppView, options, launchOptions) {
		if (this.isEmbedded()) {

			// show app formatted for iframe
			//
			this.openEmbedded(AppView, options, launchOptions);

		// check if application is already open
		//
		} else if (AppView.current && AppView.current.dialog) {

			// activate current app dialog
			//
			this.activateDialog(AppView.current, options);

			// open items
			//
			if (options) {
				this.activateApp(AppView.current, options);
			}

		// open in desktop
		//
		} else if (this.desktop && this.desktop.isOpenableApp(appName, options) && 
			!(launchOptions && launchOptions.new_window)) {

			if (!this.desktop.isCurrentApp(appName)) {
				this.openInDesktop(appName, options, launchOptions);
			} else {
				let name = config.apps[appName].name;
				this.notify({
					message: "The " + name + " application is already open on your desktop."
				});
			}

		// open new app dialog
		//
		} else {
			this.openInDialog(appName, AppView, options, launchOptions);
		}
	},

	activateApp: function(appView, options) {
		if (options.collection) {
			appView.openItems(options.collection.models, options);
		} else if (appView.openItem) {
			appView.openItem(options.model, options);			
		} else if (appView.addItem && options.model) {
			appView.addItem(options.model, options);
		}
	},

	openEmbedded: function(AppView, options, launchOptions) {
		$('#header').remove();

		// display app in application region
		//
		this.show(new AppView(_.extend({}, options, launchOptions, {
			show_sidebar: false,
			show_tabs: false
		})));

		// format for iframe
		//
		$('.header-bar').css({
			'display': 'flex',
			'justify-content': 'center'
		});
		$('.menu-bar').hide();
		$('.footer-bar').hide();
	},

	openInDesktop: function(appName, options, launchOptions) {
		let appView = this.desktop.getAppView(appName);

		// slide to this app
		//
		this.desktop.setApp(appName);

		window.setTimeout(() => {

			// open items
			//
			if (options) {
				this.activateApp(appView, options);
			}

			// perform callback
			//
			if (launchOptions && launchOptions.success) {
				launchOptions.success(appView);
			}	
		}, 500);
	},

	openInDialog: function(appName, AppView, options, launchOptions) {

		// add full screen option
		//
		if (config.apps && config.apps[appName]) {
			let preferences = config.apps[appName].preferences;
			if (preferences && preferences.full_screen) {
				launchOptions = _.extend({
					maximized: true,
					full_screen: true
				}, launchOptions);
			}
		}

		let appView = new AppView(options).launch(launchOptions);

		// perform callback
		//
		if (launchOptions && launchOptions.success) {
			launchOptions.success(appView);
		}
	},

	//
	// navigating methods
	//

	navigate: function(url, options) {

		// reset history
		//
		if (options && options.reset) {
			Backbone.history.fragment = null;
		}

		// navigate to route
		//
		this.router.navigate(url, options);
	},

	//
	// playing methods
	//

	play: function(kind) {
		if (this.isMuted()) {
			return;
		}

		// create new audio context
		//
		if (!this.audio) {
			this.audio = new Audio();
		}

		// find sound
		//
		let sound = this.getSound(kind);
		if (sound) {

			// play sound
			//
			sound.setVolume(this.getVolume() / 10);
			sound.play(this.audio);
		}
	},

	//
	// authenticating methods
	//

	localSignIn: function(done) {
		import(
			'./views/users/authentication/dialogs/sign-in-dialog-view.js'
		).then((SignInDialogView) => {
			if (!SignInDialogView.default.current) {

				// show sign in dialog
				//
				application.show(new SignInDialogView.default({

					// callbacks
					//
					success: () => this.login(done)
				}));
			}
		});
	},

	providerSignIn: function(done) {
		import(
			'./views/users/authentication/providers/dialogs/provider-sign-in-dialog-view.js'
		).then((ProviderSignInDialogView) => {

			// show sign in dialog
			//
			application.show(new ProviderSignInDialogView.default({

				// callbacks
				//
				success: () => this.login(done)
			}));
		});
	},

	signIn: function(done) {
		let config = application.session.get('config');
		if (config && config.identity_providers && config.identity_providers.length > 0) {
			this.providerSignIn(done);
		} else {
			this.localSignIn(done);
		}
	},

	register: function() {
		application.navigate('#register', {
			trigger: true
		});
	},

	providerSignUp: function() {
		import(
			'./views/users/registration/providers/dialogs/provider-sign-up-dialog-view.js'
		).then((ProviderSignUpDialogView) => {
			if (!ProviderSignUpDialogView.default.current) {

				// show provider sign up dialog
				//
				application.show(new ProviderSignUpDialogView.default({

					// callbacks
					//
					success: () => this.login()
				}));
			}
		});
	},

	signUp: function() {
		let config = application.session.get('config');
		if (config && config.identity_providers && config.identity_providers.length > 0) {
			this.providerSignUp();
		} else {
			this.register();
		}
	},

	//
	// event handlers
	//

	onSignIn: function() {

		// go to home view
		//
		this.navigate('#home', {
			trigger: true
		});

		// play login sound
		//
		this.play('login');
	},

	onSignOut: function() {

		// go to welcome view
		//
		this.navigate('#', {
			trigger: true
		});

		// play logout sound
		//
		this.play('logout');
	},

	//
	// mouse event handling methods
	//

	onMouseDown: function() {

		// switch to non keyboard accessible mode
		//
		$('body').removeClass('keyboard-accessible');
		window.removeEventListener('mousedown', this);
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {
		let activeView = this.getActiveView();

		// check that control keys are not down
		//
		if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {

			// check return key
			//
			switch (event.keyCode) {

				// return key
				//
				case Keyboard.keyCodes.enter:

					// check that element is not editable
					//
					if (event.target.type != 'input' && event.target.type != 'textarea' && !event.target.isContentEditable) {
						let buttons = activeView.$el.find('.btn-primary:not(.nosubmit):visible:enabled');

						// trigger primary button
						//
						if (buttons.length > 0) {
							$(buttons[0]).trigger('click');

							// prevent further handling of event
							//
							event.preventDefault();
							event.stopPropagation();
							return;
						}
					}
					break;

				// tab key
				//
				case Keyboard.keyCodes.tab:
					if (!$('body').hasClass('keyboard-accessible')) {

						// switch to keyboard accessible mode
						//
						$('body').addClass('keyboard-accessible');
						window.addEventListener('mousedown', this.onMouseDown);
					}
					break;
			}
		}

		// let active view handle event
		//
		if (activeView && activeView.onKeyDown) {
			if (activeView.onKeyDown(event)) {
				return;
			}
		}

		// let desktop always handle meta arrow keys
		//
		if (Keyboard.arrowKeys.contains(event.keyCode) && event.metaKey) {
			if (activeView instanceof ModalView) {
				if (this.getChildView('main').onKeyDown(event)) {
					return;
				}
			}
			event.preventDefault();
		}
	},

	//
	// window event handling methods
	//

	onResize: function(event) {
		let view = this.getView();
		if (view && view.onResize) {
			view.onResize(event);
		}
	}
}));