var LAT_CreateTask = (function () {
    return {
        CreateTask_OnChange: function () {
            if (Xrm.Page.getAttribute("lat_createtask").getValue()) {
                LAT_CreateTask.CreateTask();
            }
        },
        CreateTask: function () {
            var entity = {};
            entity.RegardingObjectId = {
                Id: Xrm.Page.data.entity.getId(),
                LogicalName: 'lat_restdemo'
            };

            var date = new Date();
            date.setDate(date.getDate() + 7);

            entity.ScheduledStart = date.toLocaleString();
            entity.PriorityCode = { Value: 2 }; //High 
            entity.Subject = 'Follow Up!!';

            var req = new XMLHttpRequest();
            req.open('POST', encodeURI(Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/TaskSet"), true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 201) {
                        var result = JSON.parse(req.responseText).d;
                        var newEntityId = result.ActivityId;
                        Xrm.Utility.openEntityForm("task", newEntityId);
                    }
                    else {
                        alert(this.statusText);
                    }
                }
            };
            req.send(JSON.stringify(entity));
        }
    }
}());