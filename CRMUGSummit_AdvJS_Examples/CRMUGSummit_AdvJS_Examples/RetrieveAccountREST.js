var LAT_RetrieveAccount = (function () {
	return {
		Account_OnChange: function () {
			var account = Xrm.Page.getAttribute("lat_account").getValue();

			if (account === null || account === undefined) {
				Xrm.Page.getAttribute("lat_accountnumber").setValue(null);
				return;
			}

			if (account[0].entityType !== "account") {
				Xrm.Page.getAttribute("lat_accountnumber").setValue(null);
				return;
			}

			LAT_RetrieveAccount.RetrieveAccountNumber(account[0].id);
		},
		RetrieveAccountNumber: function (accountId) {
			//2011 REST
			//var req = new XMLHttpRequest();
			//req.open('GET', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'"
			//    + accountId + "')?$select=AccountNumber"), true);
			//req.setRequestHeader('Accept', 'application/json');
			//req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			//req.onreadystatechange = function () {
			//    if (this.readyState === 4) {
			//        req.onreadystatechange = null;
			//        if (this.status === 200) {
			//            LAT_RetrieveAccount.RetrieveAccountNumber_Callback(JSON.parse(req.responseText).d);
			//        }
			//    }
			//};
			//req.send();

			//2016 Web API
			var req = new XMLHttpRequest();
			req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.0/accounts(" + accountId.replace("{", "").replace("}", "") + ")?$select=accountnumber", true);
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 200) {
						var result = JSON.parse(this.response);
						LAT_RetrieveAccount.RetrieveAccountNumber_Callback(result);
					}
				}
			};
			req.send();
		},
		RetrieveAccountNumber_Callback: function (result) {
			//2011 REST
			//var accountNumber = result.AccountNumber;
			//2016 Web API
			var accountNumber = result["accountnumber"];
			Xrm.Page.getAttribute("lat_accountnumber").setValue(accountNumber);
			Xrm.Page.getAttribute("lat_accountnumber").setSubmitMode("always");
		}
	}
}());