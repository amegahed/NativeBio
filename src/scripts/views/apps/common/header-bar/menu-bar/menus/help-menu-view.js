/******************************************************************************\
|                                                                              |
|                              help-menu-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying help dropdown menus.                    |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../../../../../models/files/file.js';
import Topic from '../../../../../../models/topics/topic.js';
import MenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/menu-view.js';
import AddressBar from '../../../../../../utilities/web/address-bar.js';

export default MenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation">
			<a class="view-about-info"><i class="fa fa-info-circle"></i>About <%= app_name %></a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<% if (show_documentation) { %>
		<li role="presentation">
			<a class="view-help-pages"><i class="fa fa-question-circle"></i>View Help Pages</a>
		</li>
		<% } %>
		
		<% if (show_documentation) { %>
		<li role="presentation">
			<a class="view-documentation"><i class="fa fa-book"></i>View Documentation</a>
		</li>
		<% } %>
		
		<% if (show_community_help) { %>
		<li role="presentation">
			<a class="search-for-help"><i class="fa fa-newspaper"></i>Search Community Help</a>
		</li>
		<% } %>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="contact-us"><i class="fa fa-envelope"></i>Contact Us</a>
		</li>
	`),
	
	events: {
		'click .view-about-info': 'onClickViewAboutInfo',
		'click .view-help-pages': 'onClickViewHelpPages',
		'click .view-documentation': 'onClickViewDocumentation',
		'click .search-for-help': 'onClickSearchForHelp',
		'click .contact-us': 'onClickContactUs'
	},

	//
	// querying methods
	//

	hidden: function() {
		return {
			'search-for-help': !application.isSignedIn()
		};
	},

	//
	// getting methods
	//

	getUrl: function() {
		return '#help/apps/' + this.parent.app.name.replace(/_/g, '-');
	},

	getAppName: function() {
		return config.apps[this.parent.app.name].name;
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			app_name: this.getAppName(),
			show_help: config.defaults.help.show_app != false,
			show_documentation: config.defaults.help.show_pdf != false,
			show_community_help: config.defaults.help.show_topic != false
		};
	},

	//
	// mouse event handling methods
	//

	onClickViewAboutInfo: function() {
		application.launch('help_viewer', {
			url: this.getUrl()
		});
	},

	onClickViewHelpPages: function() {
		application.launch('help_viewer');
	},
	
	onClickViewDocumentation: function() {
		application.launch('pdf_viewer', {
			model: new File({
				path: config.defaults.help.docs
			})
		});
	},

	onClickSearchForHelp: function() {
		application.launch('topic_viewer', {
			topic: new Topic({
				name: config.defaults.help.topic
			}),

			// options
			//
			search: {
				message: this.getAppName()
			},

			// capabilities
			//
			editable: true
		});
	},

	onClickContactUs: function() {
		application.showUrl(AddressBar.get('base') + '#contact');
	}
});