var LAT_UpdateContact = (function () {
    return {
        Address_OnChange: function () {
            //debugger;
            var contact = Xrm.Page.getAttribute("lat_contact").getValue();
            if (contact === null || contact === undefined) {
                return;
            }

            LAT_UpdateContact.UpdatePrimaryContact(contact[0].id);
        },
        UpdatePrimaryContact: function (contactId) {
            var entity = {};
            entity.Address1_Line1 = Xrm.Page.getAttribute("lat_address1").getValue();
            entity.Address1_City = Xrm.Page.getAttribute("lat_city").getValue();
            entity.Address1_StateOrProvince = Xrm.Page.getAttribute("lat_state").getValue();
            entity.Address1_PostalCode = Xrm.Page.getAttribute("lat_zip").getValue();

            var req = new XMLHttpRequest();
            req.open('POST', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + contactId + "')"), true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader('X-HTTP-Method', 'MERGE');
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204 || this.status == 1223) {
                        alert('Updated'); //Success - No Return Data - Do Something
                    }
                    else {
                        alert(this.statusText);
                    }
                }
            };
            req.send(JSON.stringify(entity));
        },
        GetContactData: function () {
            Xrm.Page.getAttribute("lat_address1").setValue(null);
            Xrm.Page.getAttribute("lat_city").setValue(null);
            Xrm.Page.getAttribute("lat_state").setValue(null);
            Xrm.Page.getAttribute("lat_zip").setValue(null);

            var contact = Xrm.Page.getAttribute("lat_contact").getValue();
            if (contact === null || contact === undefined)
                return;

            var req = new XMLHttpRequest();
            req.open("GET", encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" +
                contact[0].id + "')?$select=Address1_City,Address1_Line1,Address1_PostalCode,Address1_StateOrProvince"), true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var result = JSON.parse(req.responseText).d;
                        Xrm.Page.getAttribute("lat_address1").setValue(result.Address1_Line1);
                        Xrm.Page.getAttribute("lat_city").setValue(result.Address1_City);
                        Xrm.Page.getAttribute("lat_state").setValue(result.Address1_StateOrProvince);
                        Xrm.Page.getAttribute("lat_zip").setValue(result.Address1_PostalCode);
                    }
                    else {
                        alert(this.statusText);
                    }
                }
            };
            req.send();
        }
    }
}());