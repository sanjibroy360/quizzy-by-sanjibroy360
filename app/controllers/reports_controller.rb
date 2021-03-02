class ReportsController < ApplicationController
  before_action :authenticate_user, only: [:index]

  def index
    @reports = Attempt.generate_report
    if @reports.blank?
      render json: { message: "No attempts found" }, status: :unprocessable_entity
    else
      render json: { reports: @reports }, status: :ok
    end
  end
end
