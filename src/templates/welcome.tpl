<div class="section colored aqua">
	<div class="row">
		<div class="col-sm-6">
			<a class="unstyled" href="#features/easy-to-use">
				<h2><i class="fa fa-question-circle"></i>What Is <%= application.name %>?</h2>
				<p><%= application.name %> is a soverign data portal for use by members of tribal nations.</p>
			</a>
		</div>
		<div class="col-sm-6">
			<div class="figure">
				<a href="images/info/desktop/desktop.png" target="_blank" class="lightbox" title="<%= application.name %> Desktop"><img src="images/info/desktop/desktop.png" /></a>
				<div class="caption"><%= application.name %> Desktop</div>
			</div>
		</div>
	</div>
</div>

<div class="section">
	<div class="row">
		<div class="col-sm-6">
			<a class="unstyled" href="#about">
				<h2><i class="fa fa-flag"></i>Sovereign Data Management</h2>
				<p><%= application.name %> is owned and operated by the BioData Consortium rather than by the tech giants. </p>
			</a>
		</div>
		<div class="col-sm-6">
			<div class="figure">
				<img src="images/logos/native-biodata-icon.png" />
			</div>
		</div>
	</div>
</div>

<div class="section">
	<div class="row">
		<div class="col-sm-6">
			<a class="unstyled" href="#about">
				<h2><i class="fa fa-smile"></i>Easy to Use</h2>
				<p><%= application.name %> works like your desktop operating system so it's easy to learn how to use. </p>
			</a>
		</div>
		<div class="col-sm-6">
			<div class="figure">
				<a href="images/info/features/easy-to-use.png" target="_blank" class="lightbox" title="Easy to Use File Management"><img src="images/info/features/easy-to-use.png" /></a>
				<div class="caption">Easy to Use File Management</div>
			</div>
		</div>
	</div>
</div>

<div class="section">
	<div class="row">
		<div class="col-sm-6">
			<a class="unstyled" href="#about">
				<h2><i class="fa fa-earth"></i>Manage Geolocated Data</h2>
				<p><%= application.name %> allows you to easily view and manage geolocated image data. </p>
			</a>
		</div>
		<div class="col-sm-6">
			<div class="figure">
				<a href="images/info/features/map-viewer.png" target="_blank" class="lightbox" title="Manage Geolocated Imagery"><img src="images/info/features/map-viewer.png" /></a>
				<div class="caption">Manage Geolocated Imagery</div>
			</div>
		</div>
	</div>
</div>

<div class="section">
	<div class="row">
		<div class="col-sm-6">
			<a class="unstyled" href="#features/platform-independent">
				<h2><i class="fa fa-mobile"></i>Access It From Anywhere</h2>
				<p>Access your digital world from anywhere on any internet connected device. </p>
			</a>
		</div>
		<div class="col-sm-6">
			<a class="unstyled" href="#features/platform-independent">
				<div class="figure">
					<a href="images/info/desktop/iphone-desktop.png" target="_blank" class="lightbox" title="<%= application.name %> Mobile"><img src="images/info/desktop/iphone-desktop.png" /></a>
					<div class="caption"><%= application.name %> Mobile</div>
				</div>
			</a>
		</div>
	</div>
</div>

<div class="section">
	<a class="unstyled" href="#apps">
		<h2><i class="fa fa-rocket"></i>Apps!</h2>
		<p><%= application.name %> has an extensive collection of apps for viewing, managing and sharing your data.</p>
	</a>

	<div class="carousel">
		<% let apps = config.apps; %>
		<% let keys = Object.keys(apps); %>
		<% for (let i = 0; i < keys.length; i++) { %>
		<% let app = apps[keys[i]]; %>

		<% if (!app.disabled) { %>
		<div class="carousel-cell">
			<div class="app-icons large icon-grid items">
				<a href="#apps/<%= app.app %>">
				<div class="item" href="#apps/profile-browser" style="text-decoration:none">	
					<div class="row">
						<div class="icon colored <%= app.color %>">
							<img src="images/icons/apps/<%= app.image || app.app + '.svg' %>" />
							<i class="<%= app.icon %>"></i>
						</div>
					</div>
					<div class="row">
						<div class="name"><%= app.name %></div>
					</div>
				</div>
				</a>
			</div>
		</div>
		<% } %>

		<% } %>
	</div>
</div>