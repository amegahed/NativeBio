/******************************************************************************\
|                                                                              |
|                               footer-bar-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used to display an app's footer bar.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ToolbarContainerView from '../../../../views/apps/common/toolbars/toolbar-container-view.js';
import WindowBarView from '../../../../views/apps/common/footer-bar/window-bar/window-bar-view.js';

export default ToolbarContainerView.extend({

	//
	// attributes
	//

	className: 'footer-bar',
	toolbars: ['window', 'status'],

	//
	// querying methods
	//

	regions: function() {
		let regions = {};
		for (let i = 0; i < this.toolbars.length; i++) {
			let toolbar = this.toolbars[i];
			regions[toolbar] = {
				el: '.' + toolbar.replace(/_/g, '-') + '-bar',
				replaceElement: true
			};
		}
		return regions;
	},

	getWindowBarView: function() {
		return new WindowBarView();
	},

	//
	// rendering methods
	//

	showToolbar: function(kind) {
		switch (kind) {
			case 'window':
				this.showWindowBar();
				break;
			case 'nav':
				this.showNavBar();
				break;
			case 'status':
				this.showStatusBar();
				break;
		}
	},

	showWindowBar: function() {
		this.showChildView('window', this.getWindowBarView());
	},

	showNavBar: function() {
		this.showChildView('nav', this.getNavBarView());
	},

	showStatusBar: function() {
		this.showChildView('status', this.getStatusBarView());
	}
});