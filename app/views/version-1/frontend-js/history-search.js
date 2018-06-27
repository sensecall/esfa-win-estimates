$(document).ready(function () {
	// update the results count on the table
	var count = $('#history-table tbody tr').length;
	$('#history-results-count').html(count);

	// remember the checkbox filter states
	$('.filter-control').each(function() {
		var input = $(this);
		var inputName = input.attr('name');

		input.on('change', function() {
			var state;

			if( $(input).is(':checked') ){
				state = 'true';
			} else {
				state = 'false';
			};

			// if the checkbox isn't checked, we need to add a hidden input to store the state
			var hiddenInputName = inputName + '-hidden';
			var hiddenInput = $('<input id="' + hiddenInputName + '" type="hidden" name="' + inputName + '" value="' + state + '">');
			if( state == 'true' ){
				input.attr('name',inputName);
				$('#' + hiddenInputName).remove()
			} else {
				input.attr('name','');
				hiddenInput.appendTo(input.parent());
			}
		})
	})
	
})