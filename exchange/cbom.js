$(document).ready(function(){
	var apiUrl = 'json.php'; // currency api url json.php
	var exchangeRates = [];
	var timestamp = new Date(); 
	
	$.ajax({
		url: apiUrl,
		type: "GET",
		contentType: "application/json",
		dataType: "json"
	})
	.done(function(data) {
		$.each(data, function(index, value){
			if(index == "timestamp"){
				timestamp = new Date();
				timestamp.setTime(value * 1000); // convert PHP timestamp to javascript timestamp
			}
			if(index == "rates"){
				rates = value; // get the rates
				$.each(rates, function(currencyCode, exchangeRate){
					// loop it and push in array with Key!
					exchangeRates[currencyCode] = [];
					exchangeRates[currencyCode].push(exchangeRate);
				});
			}
			if(index=="currencies"){
				currencies = value;
				// push the currency Name
				$.each(currencies, function(currencyCode, currencyName){
					exchangeRates[currencyCode].push(currencyName);
				});
			}
		});
		for (exRate in exchangeRates) {

			var div = $("<div class='col col-xs-6 col-sm-4 col-md-3 col-lg-3'>");
			var rateWap = $("<div class='rateWrap'>");

			var h2 = $("<h2 class='title-rate'>");
			var h3 = $("<h3 class='title-code'>");

			exchangeRate = exchangeRates[exRate][0]; // rate 
			currencyName = exchangeRates[exRate][1]; // currency Name

			$(div).attr('id',exRate);		// USD
			$(h2).html(exchangeRate);		// 970.00 
			$(h3).html(currencyName);		// United States
			$(h3).addClass('flag-'+exRate); // .flag-USD
			
			$(rateWap).append($(h2));
			$(rateWap).append($(h3));
			$(div).append($(rateWap));

			$("#exchangeWrap").append($(div));
		};
		
		$("#message").hide(); // hide the fetching message
		$("#date").html(timestamp); // update the timestamp
	})
	.fail(function(data) {
		// show error message
		$("#message").html("<p>Error occured while fetching exchange data ...</p>");
		$("#message").removeClass('alert-warning');
		$("#message").addClass('alert alert-danger');
		$("#message").show();

	})
	.always(function() {
		
	});
	
});