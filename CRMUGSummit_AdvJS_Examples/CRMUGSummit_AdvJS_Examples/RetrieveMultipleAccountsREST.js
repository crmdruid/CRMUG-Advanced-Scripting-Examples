var LAT_RetrieveMultipleAccounts = (function () {
    return {
        RetrieveTop5YTD: function () {
            var context = LAT_RetrieveMultipleAccounts.GetContext();

            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                url: context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet?$select=Revenue,Name&" +
                    "$filter=StateCode/Value eq 0 and  AccountNumber ne null&$top=5&$orderby=Revenue desc",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Accept', 'application/json');
                },
                async: true,
                success: function (data, textStatus, xhr) {
                    var results = data.d.results;
                    for (var i = 0; i < results.length; i++) {
                        var row = "<tr><td>" + results[i].Name + "</td><td>$" + parseFloat(results[i].Revenue.Value).toFixed(2) + "</td></tr>";
                        $("#Top5YTD").append(row);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(textStatus + ' ' + errorThrown);
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