require "axlsx"

class ReportDownloaderJob < ApplicationJob
  queue_as :default

  def perform(reports)
    generate_report_spreadsheet(reports)
  end

  private

  def generate_report_spreadsheet(reports)
   
    Axlsx::Package.new do |p|
      p.workbook.add_worksheet(name: "Report") do |sheet|
        sheet.add_row ["Quiz name", "User name", "Email", "Correct answers", "Incorrect answers"]
        reports.map do |report|
          sheet.add_row [report[:quiz_name], report[:user_name], report[:email], report[:correct_answers_count], report[:incorrect_answers_count]]
        end
      end
      p.use_shared_strings = true
      p.serialize("public/report.xlsx")
    end
  end
end
