class ReportDownloadsController < ApplicationController
  def create
    if report_exists?
      File.delete("public/report.xlsx")
    end
    @reports = Attempt.generate_report()
    ReportDownloaderJob.perform_later(@reports)
    sleep 11
    render json: { message: "Your report is prepared successfully" }, status: :ok
  end

  def show
    if report_exists?
      send_file "public/report.xlsx", type: "application/xlsx", disposition: "attachmaent"
    else
      render json: { message: "Report not found" }, status: 404
    end
  end

  private

  def report_exists?
    File.exists?("public/report.xlsx")
  end
end
