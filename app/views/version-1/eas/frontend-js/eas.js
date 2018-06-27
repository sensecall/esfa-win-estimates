$(document).ready(function() {
	$('.autocomplete-element').each(function() {
		var selectEl = document.querySelector('#' + $(this).attr('id') )
		accessibleAutocomplete.enhanceSelectElement({
			autoselect: false,
			defaultValue: '',
			minLength: 0,
			selectElement: selectEl
		})
	})
})