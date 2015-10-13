var LAT_QualifyLead = (function () {
    return {
        QualifyLead: function () {

            var lead = Xrm.Page.getAttribute("lat_lead").getValue();
            if (lead === null || lead == undefined)
                return;

            var request = [];
            request.push(" <s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">");
            request.push("   <s:Body>");
            request.push("     <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">");
            request.push("       <request i:type=\"b:QualifyLeadRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">");
            request.push("         <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">");
            request.push("           <a:KeyValuePairOfstringanyType>");
            request.push("             <c:key>LeadId</c:key>");
            request.push("             <c:value i:type=\"a:EntityReference\">");
            request.push("               <a:Id>" + lead[0].id + "</a:Id>");
            request.push("               <a:LogicalName>lead</a:LogicalName>");
            request.push("               <a:Name i:nil=\"true\" />");
            request.push("             </c:value>");
            request.push("           </a:KeyValuePairOfstringanyType>");
            request.push("           <a:KeyValuePairOfstringanyType>");
            request.push("             <c:key>CreateAccount</c:key>");
            request.push("             <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">true</c:value>");
            request.push("           </a:KeyValuePairOfstringanyType>");
            request.push("           <a:KeyValuePairOfstringanyType>");
            request.push("             <c:key>CreateContact</c:key>");
            request.push("             <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">true</c:value>");
            request.push("           </a:KeyValuePairOfstringanyType>");
            request.push("           <a:KeyValuePairOfstringanyType>");
            request.push("             <c:key>CreateOpportunity</c:key>");
            request.push("             <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">false</c:value>");
            request.push("           </a:KeyValuePairOfstringanyType>");
            request.push("           <a:KeyValuePairOfstringanyType>");
            request.push("             <c:key>Status</c:key>");
            request.push("             <c:value i:type=\"a:OptionSetValue\">");
            request.push("               <a:Value>3</a:Value>"); //Qualified
            request.push("             </c:value>");
            request.push("           </a:KeyValuePairOfstringanyType>");
            request.push("         </a:Parameters>");
            request.push("         <a:RequestId i:nil=\"true\" />");
            request.push("         <a:RequestName>QualifyLead</a:RequestName>");
            request.push("       </request>");
            request.push("     </Execute>");
            request.push("   </s:Body>");
            request.push(" </s:Envelope>");

            var serverUrl = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
            var req = new XMLHttpRequest();
            req.open("POST", serverUrl, false);
            req.setRequestHeader("Accept", "application/xml, text/xml, */*");
            req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var response = req.responseXML;
                        var id = $(response).children(":first").children(":first").children(":first")
                            .children(":first").children("a\\:Results").children("a\\:KeyValuePairOfstringanyType")
                            .children("c\\:value").children(":first").children("a\\:Id").text();

                        Xrm.Page.getAttribute("lat_lead").setValue(null);
                        Xrm.Page.getAttribute("lat_qualifylead").setValue(false);

                        Xrm.Utility.openEntityForm("account", id);
                    }
                }
            };
            req.send(request.join(""));
        }
    }
}());