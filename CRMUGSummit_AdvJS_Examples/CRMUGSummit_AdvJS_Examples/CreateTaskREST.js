var LAT_CreateTask = (function () {
	return {
		CreateTask_OnChange: function () {
			if (Xrm.Page.getAttribute("lat_createtask").getValue()) {
				LAT_CreateTask.CreateTask();
			}
		},
		CreateTask: function () {
			//2011 REST
			//var entity = {};
			//entity.RegardingObjectId = {
			//	Id: Xrm.Page.data.entity.getId(),
			//	LogicalName: 'lat_restdemo'
			//};

			//var date = new Date();
			//date.setDate(date.getDate() + 7);

			//entity.ScheduledStart = date.toLocaleString();
			//entity.PriorityCode = { Value: 2 }; //High 
			//entity.Subject = 'Follow Up!!';

			//var req = new XMLHttpRequest();
			//req.open('POST', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/TaskSet"), true);
			//req.setRequestHeader('Accept', 'application/json');
			//req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			//req.onreadystatechange = function () {
			//	if (this.readyState === 4) {
			//		req.onreadystatechange = null;
			//		if (this.status === 201) {
			//			var result = JSON.parse(req.responseText).d;
			//			var newEntityId = result.ActivityId;
			//			Xrm.Utility.openEntityForm("task", newEntityId);
			//		}
			//		else {
			//			Xrm.Utility.alertDialog(this.statusText);
			//		}
			//	}
			//};
			//req.send(JSON.stringify(entity));

			//2016 Web API
			var entity = {};
			entity["regardingobjectid_lat_restdemo@odata.bind"] = "/lat_restdemos(" + Xrm.Page.data.entity.getId().replace("{", "").replace("}", "") + ")";

			var date = new Date();
			date.setDate(date.getDate() + 7);

			entity.scheduledstart = date.toISOString();
			entity.prioritycode = 2;
			entity.subject = "Follow Up!!";

			var req = new XMLHttpRequest();
			req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v8.0/tasks", true);
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status === 204) {
						var uri = this.getResponseHeader("OData-EntityId");
						var regExp = /\(([^)]+)\)/;
						var matches = regExp.exec(uri);
						var newEntityId = matches[1];
						Xrm.Utility.openEntityForm("task", newEntityId);
					}
					else {
						Xrm.Utility.alertDialog(this.statusText);
					}
				}
			};
			req.send(JSON.stringify(entity));
		}
	}
}());