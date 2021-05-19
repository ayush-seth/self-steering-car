let defaultText;
$(document).ready(() => {
	defaultText = $('#checkpoint-count').text();

	// resize();
	// $(window).on('resize', function () {
	// 	resize();
	// });
});

function updateCheckpointCount() {
	$(document).ready(() => {
		$('#checkpoint-count').text(
			defaultText + ' ' + vehicle.numOfObjectsPassed
		);
	});
}

// function resize() {
// 	$('#defaultCanvas0').outerHeight(
// 		$(window).height() -
// 			$('#defaultCanvas0').offset().top -
// 			Math.abs(
// 				$('#defaultCanvas0').outerHeight(true) -
// 					$('#defaultCanvas0').outerHeight()
// 			)
// 	);
// }
