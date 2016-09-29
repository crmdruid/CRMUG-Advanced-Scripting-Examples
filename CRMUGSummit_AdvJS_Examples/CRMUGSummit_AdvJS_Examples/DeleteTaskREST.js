var LAT_DeleteTask = (function () {
	return {
		DeleteTask_OnChange: function () {
			if (Xrm.Page.getAttribute("lat_deletetask").getValue() !== true) {
				return;
			}

			var req = new XMLHttpRequest();
			req.open('GET', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/TaskSet?$select=ActivityId&" +
                "$filter=StatusCode/Value eq 2 and PriorityCode/Value eq 2 and Subject eq 'Follow Up!!' and RegardingObjectId/Id eq guid'" +
                Xrm.Page.data.entity.getId() + "'&" + "$top=1&$orderby=CreatedOn desc"), false);
			req.setRequestHeader('Accept', 'application/json');
			req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 200) {
						var returned = JSON.parse(req.responseText).d;
						var results = returned.results;
						if (results !== null && results !== undefined) {
							var activityId = results[0].ActivityId;
							LAT_DeleteTask.DeleteTask(activityId);
						}
						Xrm.Page.getAttribute("lat_deletetask").setValue(false);
					}
					else {
						Xrm.Utility.alertDialog(this.statusText);
					}
				}
			};
			req.send();
		},
		DeleteTask: function (activityId) {
			//2011 REST
			//var req = new XMLHttpRequest();
			//req.open('POST', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/TaskSet(guid'" +
			//    activityId + "')"), true);
			//req.setRequestHeader('Accept', 'application/json');
			//req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			//req.setRequestHeader('X-HTTP-Method', 'DELETE');
			//req.onreadystatechange = function () {
			//    if (this.readyState === 4) {
			//        req.onreadystatechange = null;
			//        if (this.status === 204 || this.status === 1223) {
			//            Xrm.Page.getAttribute("lat_createtask").setValue(false);
			//            Xrm.Utility.alertDialog('Task Deleted'); //Success - No Return Data - Do Something                             
			//        }
			//        else {
			//        	Xrm.Utility.alertDialog(this.statusText);
			//        }
			//    }
			//};
			//req.send();

			//2016 Web API
			var req = new XMLHttpRequest();
			req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v8.0/tasks(" + activityId.replace("{", "").replace("}", "") + ")", true);
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 204 || this.status === 1223) {
						Xrm.Page.getAttribute("lat_createtask").setValue(false);
						Xrm.Utility.alertDialog('Task Deleted'); //Success - No Return Data - Do Something  
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