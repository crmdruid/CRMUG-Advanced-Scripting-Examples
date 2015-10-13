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
            var req = new XMLHttpRequest();
            req.open('GET', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'"
                + accountId + "')?$select=AccountNumber"), true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        LAT_RetrieveAccount.RetrieveAccountNumber_Callback(JSON.parse(req.responseText).d);
                    }
                }
            };
            req.send();
        },
        RetrieveAccountNumber_Callback: function (result) {
            var accountNumber = result.AccountNumber;
            Xrm.Page.getAttribute("lat_accountnumber").setValue(accountNumber);
            Xrm.Page.getAttribute("lat_accountnumber").setSubmitMode("always");
        }
    }
}());