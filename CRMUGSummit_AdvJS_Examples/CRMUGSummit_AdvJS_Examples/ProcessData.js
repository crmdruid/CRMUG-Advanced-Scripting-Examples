var LAT_ProcessData = (function () {
    return {
        GetDataParam: function () {
            var vals = [];
            if (location.search != "") {
                vals = location.search.substr(1).split("&");
                for (var i = 0; i < vals.length; i++) {
                    vals[i] = vals[i].replace(/\+/g, " ").split("=");
                }
                for (var j = 0; j < vals.length; j++) {
                    if (vals[j][0].toLowerCase() == "data") {
                        LAT_ProcessData.ParseData(vals[j][1]);
                        break;
                    }
                }
            }
        },
        ParseData: function (data) {
            var vals = [];
            vals = decodeURIComponent(data).split("&");
            for (var i = 0; i < vals.length; i++) {
                vals[i] = vals[i].replace(/\+/g, " ").split("=");
            }

            for (var x = 0; x < vals.length; x++) {
                var row = "<tr><td>Name: </td><td>" + vals[x][0] + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Value: </td><td>" + vals[x][1] + "</td></tr>";
                $("#PassedValues").append(row);
            }
        }
    }
}());