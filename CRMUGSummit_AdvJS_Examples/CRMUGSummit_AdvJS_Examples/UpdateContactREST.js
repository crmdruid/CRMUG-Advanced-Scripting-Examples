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
			//2011 REST
			//var entity = {};
			//entity.Address1_Line1 = Xrm.Page.getAttribute("lat_address1").getValue();
			//entity.Address1_City = Xrm.Page.getAttribute("lat_city").getValue();
			//entity.Address1_StateOrProvince = Xrm.Page.getAttribute("lat_state").getValue();
			//entity.Address1_PostalCode = Xrm.Page.getAttribute("lat_zip").getValue();

			//var req = new XMLHttpRequest();
			//req.open('POST', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + contactId + "')"), true);
			//req.setRequestHeader('Accept', 'application/json');
			//req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			//req.setRequestHeader('X-HTTP-Method', 'MERGE');
			//req.onreadystatechange = function () {
			//    if (this.readyState === 4) {
			//        req.onreadystatechange = null;
			//        if (this.status === 204 || this.status === 1223) {
			//        	Xrm.Utility.alertDialog('Updated'); //Success - No Return Data - Do Something
			//        }
			//        else {
			//        	Xrm.Utility.alertDialog(this.statusText);
			//        }
			//    }
			//};
			//req.send(JSON.stringify(entity));

			//2016 Web API
			var entity = {};
			entity.address1_line1 = Xrm.Page.getAttribute("lat_address1").getValue();
			entity.address1_city = Xrm.Page.getAttribute("lat_city").getValue();
			entity.address1_stateorprovince = Xrm.Page.getAttribute("lat_state").getValue();
			entity.address1_postalcode = Xrm.Page.getAttribute("lat_zip").getValue();

			var req = new XMLHttpRequest();
			req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.0/contacts(" + contactId.replace("{", "").replace("}", "") + ")", true);
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 204) {
						//Success - No Return Data - Do Something
					}
					else {
						Xrm.Utility.alertDialog(this.statusText);
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
						Xrm.Utility.alertDialog(this.statusText);
					}
				}
			};
			req.send();
		}
	}
}());