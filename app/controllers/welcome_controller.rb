class WelcomeController < ApplicationController
  def index
    @props = {
      name: "React",
      rap:  "Yo"
    }
  end
end
