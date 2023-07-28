/******************************************************************************\
|                                                                              |
|                          storage-settings-form-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing an account settings form.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../views/forms/form-view.js';
import PieView from '../../../../../views/forms/outputs/pie-view.js';
import '../../../../../utilities/scripting/string-utils.js';
import '../../../../../utilities/time/date-utils.js';
import '../../../../../utilities/time/time-utils.js';

export default FormView.extend({

	//
	// attributes
	//

	className: 'form-horizontal narrow',

	template: template(`
		<div class="settings icon-grid">
			<div class="item">
				<div class="row">
					<div class="icon colored grey">
						<img src="images/icons/settings/storage.svg" />
						<i class="fa fa-database"></i>
					</div>
				</div>
				<div class="row">
					<div class="name">Storage</div>
				</div>
			</div>
		</div>
		
		<h3><i class="fa fa-database"></i>Disk Space</h3>
		<p>You are currently allocated a total of <%= disk_quota? disk_quota + ' of': 'unlimited' %> disk space.</p>
		<div class="panel">
			<div class="pie"></div>
		
			<div class="disk-used form-group">
				<label class="form-label">Used</label>
				<p class="form-control-static">
					<%= disk_used %> / <%= disk_quota %> = <%= percent_disk_used %>%
				</p>
			</div>
		
			<div class="disk-free form-group">
				<label class="form-label">Free</label>
				<p class="form-control-static">
					<%= disk_free %> / <%= disk_quota %> = <%= percent_disk_free %>%
				</p>
			</div>
		</div>
		
		<% if (show_upgrade_account) { %>
		<div class="buttons" style="text-align:center">
			<button class="upgrade-account btn">
				<i class="fa fa-arrow-up"></i>Upgrade Account
			</button>
		</div>
		<% } %>
	`),

	regions: {
		pie: {
			el: '.pie',
			replaceElement: true
		}
	},
	
	events: {
		'click .upgrade-account': 'onClickUpgradeAccount'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			disk_used: this.model.getDiskUsed(),
			disk_free: this.model.getDiskFree(),
			percent_disk_used: Math.round(this.model.getPercentDiskUsed()),
			percent_disk_free: Math.round(this.model.getPercentDiskFree()),
			show_upgrade_account: this.options.upgrade_account_url != undefined
		};
	},

	onRender: function() {
		if (this.model.has('disk_quota')) {
			let percent = Math.min(this.model.getPercentDiskUsed(), 100);

			this.showChildView('pie', new PieView({
				angle: percent / 100 * 360
			}));
		}
	},

	//
	// mouse event handlers
	//

	onClickUpgradeAccount: function() {
		application.showUrl(this.options.upgrade_account_url);
	}
});
