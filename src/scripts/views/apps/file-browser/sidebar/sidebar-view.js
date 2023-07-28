/******************************************************************************\
|                                                                              |
|                               sidebar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's sidebar.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarView from '../../../../views/apps/common/sidebar/sidebar-view.js';
import FileCopyable from '../../../../views/apps/file-browser/mainbar/behaviors/file-copyable.js';
import ClipboardPanelView from '../../../../views/apps/file-browser/sidebar/panels/clipboard-panel-view.js';
import FavoritesPanelView from '../../../../views/apps/file-browser/sidebar/panels/favorites-panel-view.js';
import LocationPanelView from '../../../../views/apps/file-browser/sidebar/panels/location-panel-view.js';
import SharedPanelView from '../../../../views/apps/file-browser/sidebar/panels/shared-panel-view.js';

export default SideBarView.extend({

	//
	// attributes
	//

	panels: ['clipboard', 'favorites', 'location', 'shared'],

	//
	// attribute methods
	//

	enabled: function() {
		let isSignedIn = application.isSignedIn();
		let isInClipboardDirectory = this.isInClipboardDirectory();

		return {
			'clipboard': isSignedIn && !isInClipboardDirectory,
			'favorites': isSignedIn,
			'location': isSignedIn,
			'shared': isSignedIn
		};
	},

	//
	// querying methods
	//

	isInClipboardDirectory: function() {
		return this.model.get('path') == FileCopyable.clipboardDirectoryName + '/';
	},

	//
	// setting methods
	//

	selectItem: function(item) {
		if (this.hasChildView('location')) {
			this.getChildView('location').selectItem(item);
		}	
	},

	//
	// panel rendering methods
	//

	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'clipboard':
				this.showClipboardPanel();
				break;
			case 'favorites':
				this.showFavoritesPanel();
				break;
			case 'location':
				this.showLocationPanel();
				break;
			case 'shared':
				this.showSharedPanel();
				break;
		}
	},

	showClipboardPanel: function() {
		this.showChildView('clipboard', new ClipboardPanelView({

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onchange: () => this.onChange(),
			onselect: (item) => this.onOpen(item)
		}));
	},

	showFavoritesPanel: function() {
		this.showChildView('favorites', new FavoritesPanelView({

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onchange: () => this.onChange(),
			onselect: (item) => this.onOpen(item)
		}));		
	},

	showLocationPanel: function() {	
		this.showChildView('location', new LocationPanelView({

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onchange: () => this.onChange(),
			onselect: (item) => this.onOpen(item)
		}));	
	},

	showSharedPanel: function() {
		this.showChildView('shared', new SharedPanelView({

			// options
			//
			view_kind: this.options.view_kind,

			// callbacks
			//
			onchange: () => this.onChange(),
			onselect: (item) => this.onOpen(item)
		}));	
	},

	//
	// event handling methods
	//

	onChange: function() {
		
		// perform callback
		//
		if (this.options.onchange) {
			this.options.onchange();
		}
	},

	//
	// selection event handling methods
	//

	onOpen: function(item) {

		// open selected item
		//
		this.app.openItem(item.model);

		// perform callback
		//
		if (this.options.onopen) {
			this.options.onopen();
		}
	},

	//
	// keyboard event handling methods
	//

	onKeyDown: function(event) {

		// check favorites keyboard shortcuts
		//
		if (this.hasChildView('favorites') && this.getChildView('favorites').onKeyDown) {
			this.getChildView('favorites').onKeyDown(event);
		}
	},

	//
	// window event handling methods
	//

	onResize: function(event) {

		// resize favorites view
		//
		if (this.hasChildView('favorites')) {
			this.getChildView('favorites').onResize(event);
		}
	}
});