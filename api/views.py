from django.shortcuts import render
from django.http import HttpResponse
import xml.etree.cElementTree as ET
import urllib2
import json

# Create your views here.
def api_gps(request):
    if request.method == "GET":
        if request.GET.has_key('lat') and request.GET.has_key('lng'):
            lat = request.GET['lat']
            lng = request.GET['lng']
            generateXML(lat, lng)
            return HttpResponse(json.dumps({'success':True}))
        return HttpResponse(json.dumps({'success':False}))


def generateXML(lat, lng):
    gpx = ET.Element("gpx", version="1.1", creator="Xcode")
    wpt = ET.SubElement(gpx, "wpt", lat=lat, lon=lng)
    ET.SubElement(wpt, "name").text = "PokemonLocation"
    ET.ElementTree(gpx).write("somewhere.gpx")
    #print "Location Updated!", "latitude:", lat, "longitude:" ,lng