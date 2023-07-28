/******************************************************************************\
|                                                                              |
|                               contact-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the contact us view of the application.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../views/base-view.js';
import ContactFormView from '../../views/contact/forms/contact-form-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	template: template(`
		<h1><i class="fa fa-envelope"></i>Contact Us</h1>
		
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
			<li><i class="fa fa-envelope"></i>Contact Us</li>
		</ol>
		
		<div class="content">
		
			<% if (user_help) { %>
			<h2><i class="fa fa-cog"></i>Technical Questions</h2>
			<p>For technical questions, if you can log in to the application, we ask that you post your question to the public news group about the platform.  This will help other users that may have the same question. </p>
			<% } %>
		
			<% if (contact_form) { %>
			<% if (user_help) { %>
			<h2><i class="fa fa-question-circle"></i>Other Questions and Comments</h2>
			<p>For all other questions and comments, please fill out the contact form below: </p>
			<br />
			<% } else { %>
			<p>For questions and comments, please fill out the contact form below: </p>
			<br />
			<% } %>
			<div class="panel">
				<div class="contact-form"></div>
			</div>
			<% } %>
		</div>
	`),

	regions: {
		form: '.contact-form'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return config.defaults.contact;
	},

	onRender: function() {
		if (config.defaults.contact.contact_form) {
			this.showChildView('form', new ContactFormView());
		}
	}
});
