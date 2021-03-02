import React, { useEffect, useState } from "react";
import reportApi from "apis/report";
import Loader from "components/Common/Loader";
import Button from "components/Form/Button";
import Toastr from "components/Common/Toaster";

import { saveAs } from "file-saver";

export default function DownloadReport({ location }) {
  function handleDownload(event) {
    const data = URL.createObjectURL(new Blob([location.send.data]));
    saveAs(data, "report.xlsx");
  }

  return (
    <div className="w-full justify-center self-center mt-24 flex">
      <div>
        <p className="text-center text-base text-gray-600">
          Report is now ready for download
        </p>
        <div className="flex justify-center">
          <Button text={"Download report"} handleClick={handleDownload} />
        </div>
      </div>
    </div>
  );
}
