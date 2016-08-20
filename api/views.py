from django.shortcuts import render
from django.http import HttpResponse
import xml.etree.cElementTree as ET
import urllib2
import json
#import appalescript

GPX_NAME = 'myLocation'
GPX_FILE = GPX_NAME + '.gpx'
# Create your views here.
def api_gps(request):
    if request.method == "GET":
        if request.GET.has_key('lat') and request.GET.has_key('lng'):
            lat = request.GET['lat']
            lng = request.GET['lng']
            generateXML(lat, lng)
            #updatePhoneGps()
            return HttpResponse( json.dumps({'success':True}) )
        return HttpResponse( json.dumps({'success':False}) )


def api_default_gps(request):
    if request.method == "GET":
        e = ET.parse(GPX_FILE).getroot()
        lat = e[0].attrib.get('lat')
        lng = e[0].attrib.get('lon')
        return HttpResponse( json.dumps({ 'success':True, 'lat':lat, 'lng':lng }) )


def generateXML(lat, lng):
    gpx = ET.Element("gpx", version="1.1", creator="Xcode")
    wpt = ET.SubElement(gpx, "wpt", lat=lat, lon=lng)
    ET.SubElement(wpt, "name").text = GPX_NAME
    ET.ElementTree(gpx).write(GPX_FILE)
    

#def updatePhoneGps():
    # cmd = ('tell application "System Events" to tell process "Xcode" \n' + 
    #       'click menu item "'+ GPX_NAME +'" of menu 1 of menu item "Simulate Location" of menu 1 of menu bar item "Debug" of menu bar 1 \n' +
    #       'end tell')
    # applescript.AppleScript(cmd).run()