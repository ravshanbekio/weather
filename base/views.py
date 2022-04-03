from django.shortcuts import render, redirect
import requests
from datetime import time, datetime


def index(request):
    return render(request, 'index.html')

def get_data(request):
    API_key = "3381b7db57c359dc59c051deb63a7a58"
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    data = request.GET["shahar"]
    result_url = base_url + "appid=" + API_key + "&q=" + data
    weather_data = requests.get(result_url).json()
    context = {
        'main_temp':weather_data["main"]["temp"],
        'region':data,
        'country':weather_data["sys"]["country"],
        'min_temp':weather_data["main"]["temp_min"],
        'max_temp':weather_data["main"]["temp_max"],
        'wind':weather_data["wind"]["speed"],
        'updated_time':time(datetime.now().hour, datetime.now().minute)
    }
    return render(request, 'index.html', context)
