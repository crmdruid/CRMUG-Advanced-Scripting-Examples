var LAT_RetrieveMultipleAccounts = (function () {
	return {
		RetrieveTop5YTD: function () {
			var context = LAT_RetrieveMultipleAccounts.GetContext();

			//2011 REST
			//$.ajax({
			//    type: 'GET',
			//    contentType: 'application/json; charset=utf-8',
			//    datatype: 'json',
			//    url: context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet?$select=Revenue,Name&" +
			//        "$filter=StateCode/Value eq 0 and  AccountNumber ne null&$top=5&$orderby=Revenue desc",
			//    beforeSend: function (XMLHttpRequest) {
			//        XMLHttpRequest.setRequestHeader('Accept', 'application/json');
			//    },
			//    async: true,
			//    success: function (data, textStatus, xhr) {
			//        var results = data.d.results;
			//        for (var i = 0; i < results.length; i++) {
			//            var row = "<tr><td>" + results[i].Name + "</td><td>$" + parseFloat(results[i].Revenue.Value).toFixed(2) + "</td></tr>";
			//            $("#Top5YTD").append(row);
			//        }
			//    },
			//    error: function (xhr, textStatus, errorThrown) {
			//    	Xrm.Utility.alertDialog(textStatus + ' ' + errorThrown);
			//    }
			//});

			//2016 Web API
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				url: context.getClientUrl() + "/api/data/v8.0/accounts?$select=name,revenue&$filter=statecode eq 0 and accountnumber ne null&$orderby=revenue desc",
				beforeSend: function (XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
					XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
					XMLHttpRequest.setRequestHeader("Accept", "application/json");
					XMLHttpRequest.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\",odata.maxpagesize=5");
				},
				async: true,
				success: function (data, textStatus, xhr) {
					var results = data.value;
					for (var i = 0; i < results.length; i++) {
						var name = results[i]["name"];
						var revenue = results[i]["revenue"];
						var revenue_formatted = results[i]["revenue@OData.Community.Display.V1.FormattedValue"];
						var row = "<tr><td>" + name + "</td><td>" + revenue_formatted + "</td></tr>";
						$("#Top5YTD").append(row);
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					Xrm.Utility.alertDialog(textStatus + " " + errorThrown);
				}
			});
		},
		GetContext: function () {
			var errorMessage = "Context is not available.";
			if (typeof GetGlobalContext != "undefined") {
				return GetGlobalContext();
			}
			else {
				if (typeof Xrm != "undefined") {
					return Xrm.Page.context;
				} else {
					throw new Error(errorMessage);
				}
			}
		}
	}
}());