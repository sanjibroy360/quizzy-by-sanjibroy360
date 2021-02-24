import React, { useEffect, useState } from "react";
import Button from "components/Form/Button";
import Toastr from "components/Common/Toaster";
// import ReportColumns from ""
import reportApi from "apis/report";
import { COLUMNS } from "../../utils/ReportColumns";
import ReactTable from "components/Quiz/ReactTable";

export default function ShowReport() {
  let [reports, setReports] = useState([]);
  useEffect(() => {
    fetchAllReports();
  }, []);

  async function fetchAllReports() {
    try {
      let response = await reportApi.getReport();
      setReports(response.data.reports);
    } catch (error) {
      Toastr.error(error.response.data);
    }
  }

  return (
    <div>
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <p className="text-3xl text-gray-600 text-semibold">Reports</p>
        <div>
          <Button text="Download" handleClick={() => null} />
        </div>
      </div>
      {reports.length > 0 && <ReactTable tableData={reports} tableColumns={COLUMNS} />}
    </div>
  );
}
