import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Form/Button";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";

import reportApi from "apis/report";
import { COLUMNS } from "../../utils/ReportColumns";
import ReactTable from "components/Quiz/ReactTable";

export default function ShowReport() {
  let history = useHistory();
  let [reports, setReports] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllReports();
  }, []);

  async function fetchAllReports() {
    try {
      setLoading(true);
      let response = await reportApi.getReport();
      setReports(response.data.reports);
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  async function prepareReport() {
    try {
      setLoading(true);
      let response = await reportApi.prepareReport();
      if (response) {
        showReport();
      }
    } catch (error) {
      prepareReport();
    }
  }

  async function showReport() {
    try {
      let response = await reportApi.downloadReport();
      if (response) {
        setLoading(false);
        history.push({
          pathname: "/dashboard/reports/download",
          send: { data: response.data },
        });
      }
    } catch (error) {
      showReport();
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <p className="text-3xl text-gray-600 text-semibold">Reports</p>
        <div>
          <Button text="Download" handleClick={prepareReport} />
        </div>
      </div>
      {reports.length > 0 && (
        <ReactTable tableData={reports} tableColumns={COLUMNS} />
      )}
    </div>
  );
}
