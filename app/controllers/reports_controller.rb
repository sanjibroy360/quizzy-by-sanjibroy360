class ReportsController < ApplicationController
  before_action :authenticate_user, only: [:index]

  def index
    @reports = Attempt.generate_report
    if @reports.count > 0
      render json: { reports: @reports }, status: :ok
    else
      render json: { message: "No attempts found" }, status: :unprocessable_entity
    end
  end
end
