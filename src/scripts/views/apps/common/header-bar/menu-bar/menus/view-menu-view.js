/******************************************************************************\
|                                                                              |
|                              view-menu-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying view dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import MenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/menu-view.js';

export default MenuView.extend({

	events: {

		// view options
		//
		'click .view-kind > a': 'onClickViewKind',
		'click .map-view-kind > a': 'onClickMapViewKind',

		// toolbar options
		//
		'click .show-toolbars > a': 'onClickShowToolbar',
		'click .show-all-toolbars': 'onClickShowAllToolbars',
		'click .show-no-toolbars': 'onClickShowNoToolbars',

		// sidebar options
		//
		'click .show-sidebar': 'onClickOption',
		'click .show-sidebar-panels > a': 'onClickShowSideBarPanel',
		'click .sidebar-view-kind > a': 'onClickSideBarViewKind',

		// window options
		//
		'click .shrink-window': 'onClickShrinkWindow',
		'click .grow-window': 'onClickGrowWindow',
		'click .expand-window': 'onClickExpandWindow',
		'click .prev-space': 'onClickPrevSpace',
		'click .next-space': 'onClickNextSpace',
		'click .view-full-screen': 'onClickViewFullScreen',

		// preferences options
		//
		'click .view-preferences': 'onClickViewPreferences'
	},

	//
	// getting methods
	//

	getSelectedSideBarPanels: function() {
		return this.getElementAttributes('.show-sidebar-panels li.selected a', 'class', (value) => {
			return value.replace('show-', '').replace('-panel', '').replace(/-/g, '_');
		});
	},

	getSelectedToolbars: function() {
		return this.getElementAttributes('.show-toolbars li.selected.option a', 'class', (value) => {
			return value.replace('show-', '').replace('-bar', '').replace(/-/g, '_');
		});
	},

	getSelectedLayers: function() {
		return this.getElementAttributes('.show-layers li.selected a', 'class', (value) => {
			return value.replace('show-', '').replace('-layer', '').replace(/-/g, '_');
		});
	},

	//
	// setting methods
	//

	setViewKind: function(viewKind) {
		this.$el.find('li.view-kind').removeClass('selected');
		this.$el.find('li.view-kind .view-' + viewKind).closest('li').addClass('selected');
	},

	setMapViewKind: function(viewKind) {
		this.$el.find('li.map-view-kind').removeClass('selected');
		this.$el.find('li.map-view-kind .view-map-' + viewKind).closest('li').addClass('selected');
	},

	setSideBarViewKind: function(viewKind) {
		this.$el.find('li.sidebar-view-kind').removeClass('selected');
		this.$el.find('li.sidebar-view-kind .view-sidebar-' + viewKind).closest('li').addClass('selected');
	},

	//
	// toggling methods
	//

	toggleOption: function(className) {
		let option = className.replace(/-/g, '_');

		// call superclass method
		//
		this.toggleMenuItem(className);

		// update parent
		//
		this.parent.app.setOption(option, this.isItemSelected(className));
	},

	toggleToolbar: function(className) {

		// call superclass method
		//
		this.toggleMenuItem(className);

		// update parent
		//
		this.parent.app.setOption('toolbars', this.getSelectedToolbars());
	},

	toggleLayer: function(className) {

		// call superclass method
		//
		this.toggleMenuItem(className);

		// update parent
		//
		this.parent.app.setOption('layers', this.getSelectedLayers());
	},

	toggleSideBarPanel: function(className) {

		// call superclass method
		//
		this.toggleMenuItem(className);

		// update parent
		//
		this.parent.app.setOption('sidebar_panels', this.getSelectedSideBarPanels());
	},

	//
	// mouse event handling methods
	//

	onClickOption: function(event) {
		let className = $(event.target).closest('a').attr('class')
			.replace('dropdown-toggle', '').trim();

		// update menu and app
		//
		this.toggleOption(className);
	},

	onClickViewKind: function(event) {
		let className = $(event.currentTarget).attr('class').split(' ')[0];
		let viewKind = className.replace('view-', '').replace(/-/g, '_').trim();

		// update menu
		//
		this.setViewKind(viewKind);

		// update parent
		//
		this.parent.app.setOption('view_kind', viewKind);
	},

	onClickMapViewKind: function(event) {
		let className = $(event.currentTarget).attr('class').split(' ')[0];
		let mapViewKind = className.replace('view-map-', '').replace(/-/g, '_');

		// update menu
		//
		this.setMapViewKind(mapViewKind);

		// update parent
		//
		this.parent.app.setOption('map_view_kind', mapViewKind);
	},

	onClickSideBarViewKind: function(event) {
		let className = $(event.currentTarget).attr('class').split(' ')[0];
		let sidebarViewKind = className.replace('view-sidebar-', '').replace(/-/g, '_');

		// update menu
		//
		this.setSideBarViewKind(sidebarViewKind);

		// update parent
		//
		this.parent.app.setOption('sidebar_view_kind', sidebarViewKind);
	},

	onClickShowToolbar: function(event) {
		this.toggleToolbar($(event.target).closest('a').attr('class'));
	},

	onClickShowAllToolbars: function() {
		this.parent.app.setOption('toolbars', true);
		this.$el.find('.show-toolbars li').addClass('selected');
	},

	onClickShowNoToolbars: function() {
		this.parent.app.setOption('toolbars', false);
		this.$el.find('.show-toolbars li').removeClass('selected');
	},

	onClickShowSideBarPanel: function(event) {
		let className = $(event.target).closest('a').attr('class');	

		// update menu and app
		//
		this.toggleSideBarPanel(className);
	},

	onClickShrinkWindow: function() {
		this.parent.app.dialog.shrink();
	},

	onClickGrowWindow: function() {
		this.parent.app.dialog.grow();
	},

	onClickExpandWindow: function() {
		this.parent.app.expand();
	},

	onClickPrevSpace: function() {
		this.parent.app.prevSpace();
	},

	onClickNextSpace: function() {
		this.parent.app.nextSpace();
	},

	onClickViewFullScreen: function() {
		application.toggleFullScreen();
	},
	
	onClickViewPreferences: function() {
		if (this.show_settings_manager != false) {
			application.launch('settings_manager', {
				app: this.parent.app
			});
		} else {
			this.parent.app.showPreferencesDialog();
		}
	}
});