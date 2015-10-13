var LAT_MoveBpf = (function () {

    return {
        OnLoad: function () {
            Xrm.Page.data.process.addOnStageChange(LAT_MoveBpf.MoveBpf);
        },

        MoveBpf: function () {
            var stageName = Xrm.Page.data.process.getSelectedStage().getName();
            var moveNext = Xrm.Page.getAttribute("lat_gotonext").getValue();

            if (moveNext && stageName === "Stage 2") {
                Xrm.Page.data.process.moveNext(function (result) {
                    // alert(result);
                });
            }
        }
    }
}());