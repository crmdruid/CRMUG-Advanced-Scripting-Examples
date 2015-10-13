/// <reference path="XrmServiceToolkit.js" />

var LAT_RetrieveAggregate = (function () {
    return {
        GetYTDSalesSum: function () {
            var fetchXml = [];
            fetchXml.push("<fetchXml distinct='false' mapping='logical' aggregate='true'>");
            fetchXml.push("<entity name='account'>");
            fetchXml.push("    <attribute name='revenue' alias='revenue_sum' aggregate='sum' />");
            fetchXml.push("    <filter type='and'>");
            fetchXml.push("      <condition attribute='accountnumber' operator='not-null' />");
            fetchXml.push("      <condition attribute='statecode' operator='eq' value='0' />");
            fetchXml.push("      <condition attribute='revenue' operator='not-null' />");
            fetchXml.push("    </filter>");
            fetchXml.push("  </entity>");
            fetchXml.push("</fetchXml>");

            var total = XrmServiceToolkit.Soap.Fetch(fetchXml.join(""));

            $("#TotalYTD").html(total[0].attributes['revenue_sum'].formattedValue);
        }
    }
}());