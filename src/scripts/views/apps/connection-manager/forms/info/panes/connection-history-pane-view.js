/******************************************************************************\
|                                                                              |
|                        connection-history-pane-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form for showing connection history information.       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../views/forms/form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<% if (typeof birth_date != 'undefined') { %>
		<div class="birth-date form-group">
			<label class="control-label"><i class="fa fa-birthday-cake"></i>Birth Date</label>
			<div class="controls">
				<p class="form-control-static">
					<%= birth_date? birth_date.format() : 'unknown' %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof created_at != 'undefined') { %>
		<div class="join-date form-group">
			<label class="control-label"><i class="fa fa-pencil-alt"></i>Join Date</label>
			<div class="controls">
				<p class="form-control-static">
					<%= created_at? created_at.format() : 'unknown' %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof accepted_at != 'undefined') { %>
		<div class="connect-date form-group">
			<label class="control-label"><i class="fa fa-user-friends"></i>Connect Date</label>
			<div class="controls">
				<p class="form-control-static">
					<%= accepted_at? accepted_at.format() : 'unknown' %>
				</p>
			</div>
		</div>
		<% } %>

		<% if (typeof last_login_at != 'undefined') { %>
		<div class="last-login-date form-group">
			<label class="control-label"><i class="fa fa-keyboard"></i>Last Login Date</label>
			<div class="controls">
				<p class="form-control-static">
					<%= last_login_at? last_login_at.format() : 'unknown' %>
				</p>
			</div>
		</div>
		<% } %>
	`)
});
