---
layout: page
title: Categories
permalink: /categories/
---
<div>
	{% for post in site.posts  %}
		{% capture tag %}{{ post.tags }}{% endcapture %}
	{% endfor %}
</div>