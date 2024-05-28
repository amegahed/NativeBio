/******************************************************************************\
|                                                                              |
|                              about-dialog-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a notification dialog that is used to show a             |
|        modal about dialog box.                                               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ModalView from '../../../views/dialogs/modal-view.js';

export default ModalView.extend({

	//
	// attributes
	//

	className: 'about modal',

	template: template(`
		<div class="modal-dialog">
		
			<div class="modal-header">
				<div class="heading">
					<div class="icon">
						<i class="fa fa-info-circle"></i>
					</div>
					<div class="title">
						About <%= branding.name %>
					</div>
				</div>
			</div>
		
			<div class="modal-content welcome">
				<div class="modal-body" style="text-align:center">
					<div class="logo" style="display:inline-block; text-align:center; padding:10px; margin: 0 auto">
						<% if (branding.about && branding.about.logo) { %>
						<img height="150" src="<%= branding.about.logo.src %>" data-toggle="tooltip" title="<%= branding.about.logo.tooltip %>" />
						<% } else if (branding.welcome.splash.brand.logo) { %>
						<% if (branding.welcome.splash.brand.logo.href) { %>
						<a href="<%= branding.welcome.splash.brand.logo.href %>"><img src="<%= branding.welcome.splash.brand.logo.src %>" data-toggle="tooltip" title="<%= branding.welcome.splash.brand.logo.tooltip %>" /></a>
						<% } else { %>
						<img height="150" src="<%= branding.welcome.splash.brand.logo.src %>" data-toggle="tooltip" title="<%= branding.welcome.splash.brand.logo.tooltip %>" />
						<% } %>
						<% } %>
					</div>
		
					<div style="text-align:center">
		
						<% if (branding.welcome.splash.brand.logotype) { %>
						<h1 class="brand" style="display:inline-flex; margin:10px">
							<% if (branding.welcome.splash.brand.logotype.names) { %>
							<% let names = branding.welcome.splash.brand.logotype.names; %>
							<% for (let i = 0; i < names.length; i++) { %><% let name = names[i]; %><span><% if (name.text) { %><%= name.text.replace(' ', '&nbsp') %></span><% } %><% } %>
							<% } %>
						</h1>
						<% } %>
		
						<% if (branding.welcome.splash.tagline && branding.welcome.splash.tagline.text) { %>
						<div class="tagline"><%= branding.welcome.splash.tagline.text %></div>
						<% } %>
		
						<% if (branding.welcome.splash.description && branding.welcome.splash.description.text) { %>
						<div class="description"><%= branding.welcome.splash.description.text %></div>
						<% } %>
						
						<% if (branding.footer.copyright) { %>
						<div class="copyright">
							<span class="year">Copyright &copy; <%= branding.footer.copyright.year %></span>
							<span class="entity"><%= branding.footer.copyright.entity %></span>
						</div>
						<% } %>
					</div>
				</div>
		
				<div class="modal-footer">
					<div class="buttons">
						<button class="ok btn btn-primary" data-dismiss="modal">
							<i class="fa fa-check"></i>OK
						</button>
					</div>
				</div>
			</div>
		</div>
	`),

	events: _.extend({}, ModalView.prototype.events, {
		'click': 'onClick',
		'click .ok': 'onClickOk'
	}),

	//
	// dialog methods
	//

	accept: function() {

		// perform callback
		//
		if (this.options.accept) {
			return this.options.accept();
		}
	},

	//
	// setting methods
	//

	setDialogStyles: function(styles) {
		if (styles.tagline) {
			this.setTagLineStyles(styles.tagline);
		}
		if (styles.description) {
			this.setDescriptionStyles(styles.description);
		}
	},

	setDialogLogoStyles: function(styles) {
		if (styles.logo) {
			this.setLogoStyles(styles.logo);
		}
		if (styles.logotype) {
			this.setLogoTypeStyles(styles.logotype);
		}
	},

	setLogoStyles: function(logo) {
		if (logo.border == 'round') {
			this.$el.find('.logo').addClass('round');
		}
		if (logo.border == 'rounded') {
			this.$el.find('.logo').addClass('rounded');
		}
		if (logo.background) {
			this.$el.find('.logo').css({
				background: logo.background
			});
		}
		if (logo.rendering == "pixelated") {
			this.$el.find('.logo img').addClass('pixelated');
		}
	},

	setLogoTypeStyles: function(logotype) {

		// set font styles
		//
		if (logotype.font) {
			this.$el.find('.brand').css({
				'font-family': config.fonts[logotype.font]['font-family']
			});
		}
		if (logotype.font_variant) {
			this.$el.find('.brand').css('font-variant', logotype.font_variant);
		}
		if (logotype.text_transform) {
			this.$el.find('.brand').css('text-transform', logotype.text_transform);
		}

		// set logotype name styles
		//
		if (logotype.names) {
			let elements = this.$el.find('.brand > span');
			for (let i = 0; i < logotype.names.length; i++) {
				this.setTextElementStyles($(elements[i]), logotype.names[i]);
			}
		}
	},

	setTextElementStyles: function(element, attributes) {
		if (attributes.color && attributes.color != 'white') {
			$(element).css('color', attributes.color);
		}
		if (attributes.font && config.fonts[attributes.font]) {
			$(element).css('font-family', config.fonts[attributes.font]['font-family']);
		}
		if (attributes.font_style) {
			$(element).css('font-style', attributes.font_style);
		}
		if (attributes.font_weight) {
			$(element).css('font-weight', attributes.font_weight);
		}
	},

	setTagLineStyles: function(tagline) {
		if (tagline.font) {
			this.$el.find('.tagline').css({
				'font-family': config.fonts[tagline.font]['font-family']
			});
		}
	},

	setDescriptionStyles: function(description) {
		if (description.font) {
			this.$el.find('.tagline').css({
				'font-family': config.fonts[description.font]['font-family']
			});
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			defaults: config.defaults,
			branding: config.branding
		};
	},

	onRender: function() {

		// call superclass method
		//
		ModalView.prototype.onRender.call(this);

		// set styles
		//
		this.setDialogStyles(config.branding.welcome.splash);
		this.setDialogLogoStyles(config.branding.welcome.splash.brand);
	},

	//
	// mouse event handling methods
	//

	onClickOk: function() {
		this.accept();
	}
});