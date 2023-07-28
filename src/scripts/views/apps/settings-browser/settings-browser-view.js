/******************************************************************************\
|                                                                              |
|                           settings-browser-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app for browsing settings and preferences.            |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AppView from '../../../views/apps/common/app-view.js';
import HeaderBarView from '../../../views/apps/settings-browser/header-bar/header-bar-view.js';
import MainBarView from '../../../views/apps/settings-browser/mainbar/mainbar-view.js';
import FooterBarView from '../../../views/apps/settings-browser/footer-bar/footer-bar-view.js';

export default AppView.extend({

	//
	// attributes
	//

	name: 'settings_browser',

	//
	// selection timeout
	//

	deselectDuration: 1000,

	//
	// constructor
	//

	initialize: function() {

		// call superclass constructor
		//
		AppView.prototype.initialize.call(this);

		// set static attributes
		//
		this.constructor.current = this;
	},

	//
	// querying methods
	//

	hasSelected: function() {
		return this.getChildView('content').hasSelected();
	},

	//
	// getting methods
	//

	getSelected: function() {
		return this.getChildView('content').getSelected();
	},

	getStatusBarView: function() {
		return FooterBarView.prototype.getStatusBarView();
	},

	getSelectedChildView: function(which) {
		return this.getChildView('content').getSelectedChildView(which);
	},

	//
	// setting methods
	//

	setSelectedItem: function(item) {
		this.setSelected(item.model.get('name'), this.category);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		AppView.prototype.onRender.call(this);

		// update
		//
		this.onLoad();
	},

	//
	// header bar rendering methods
	//

	getHeaderBarView: function() {
		return new HeaderBarView();
	},

	//
	// contents rendering methods
	//

	getContentsView: function() {
		return new MainBarView({
			onselect: (item) =>this.onSelect(item)
		});
	},

	//
	// footer bar rendering methods
	//

	getFooterBarView: function() {
		return new FooterBarView();
	},

	//
	// dialog rendering methods
	//
	
	showPreferencesDialog: function() {
		import(
			'../../../views/apps/settings-browser/dialogs/preferences/preferences-dialog-view.js'
		).then((PreferencesDialogView) => {

			// show preferences dialog
			//
			this.show(new PreferencesDialogView.default({
				model: this.preferences
			}));
		});
	},

	//
	// event handling methods
	//

	onSelect: function(item) {

		// launch settings manager
		//
		if (!item.model.has('app')) {

			// show settings
			//
			application.launch('settings_manager', {
				nav: item.model.get('name')
			});
		} else {

			// show preferences
			//
			application.launch('settings_manager', {
				app: item.model
			});
		}

		// deselect after a pause
		//
		window.setTimeout(() => {
			item.deselect();
		}, this.deselectDuration);
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {

		// clear static attributes
		//
		this.constructor.current = null;
	}
});