from django.shortcuts import render
from django.http import HttpResponse
import xml.etree.cElementTree as ET
import urllib2
import json
import time
import urllib2
from bs4 import BeautifulSoup
import os

GPX_NAME = 'myLocation'
GPX_FILE = GPX_NAME + '.gpx'
# Create your views here.
def api_gps(request):
    if request.method == "GET":
        if request.GET.has_key('lat') and request.GET.has_key('lng'):
            lat = request.GET['lat']
            lng = request.GET['lng']
            generateXML(lat, lng)
            # updatePhoneGps()
            return HttpResponse( json.dumps({'success':True}) )
        return HttpResponse( json.dumps({'success':False}) )


def api_default_gps(request):
    if request.method == "GET":
        e = ET.parse(GPX_FILE).getroot()
        lat = e[0].attrib.get('lat')
        lng = e[0].attrib.get('lon')
        return HttpResponse( json.dumps({ 'success':True, 'lat':lat, 'lng':lng }) )

        
def api_updateDeviceGps(request):
    if request.method == "GET":
        os.system('osascript autoclick.applescript')
        return HttpResponse( json.dumps({'success':True}) )
    
def api_getPokemonLocation(request):
    if request.method == "GET":
        if request.GET.has_key('minLatitude') and request.GET.has_key('maxLatitude') and request.GET.has_key('minLongitude') and request.GET.has_key('maxLongitude'):
            minLatitude = request.GET['minLatitude']
            maxLatitude = request.GET['maxLatitude']
            minLongitude = request.GET['minLongitude']
            maxLongitude = request.GET['maxLongitude']
            
            result = {}
            url = "http://www.pokeradar.io/api/v1/submissions?minLatitude={}&maxLatitude={}&minLongitude={}&maxLongitude={}".format(minLatitude, maxLatitude, minLongitude, maxLongitude)
            try:
                response = urllib2.urlopen(url, timeout=3)
                data = json.loads(response.read())
                if response.getcode() == 200:
                    result['success'] = True
                    result['message'] = []
                    pokemonData = loadPokeRadarData('pokemon-search-list.html')
                    for p in data['data']:
                        pokemonId = int(p['pokemonId'])
                        lat = float(p['latitude'])
                        lng = float(p['longitude'])
                        name = pokemonData[pokemonId]['name']
                        image = pokemonData[pokemonId]['image']
                        result['message'].append({ 'id':pokemonId, 'lat':lat, 'lng':lng, 'name':name, 'image':image })
                else:
                    message = "pokeradar request error : {0}".format(url)
                    print( "[ERROR] {0}. {1}".format(message, str(data)) )
                    result['success'] = False
                    result['message'] = message
            except Exception, e:
                message = "pokeradar error : {0}".format(url)
                print( "[ERROR] {0}. {1}".format(message, str(e)) )
                result['success'] = False
                result['message'] = message
                
            return HttpResponse( json.dumps(result) )
    #
    return HttpResponse( json.dumps({'success':False}) )


def generateXML(lat, lng):
    gpx = ET.Element("gpx", version="1.1", creator="Xcode")
    wpt = ET.SubElement(gpx, "wpt", lat=lat, lon=lng)
    ET.SubElement(wpt, "name").text = GPX_NAME
    ET.ElementTree(gpx).write(GPX_FILE)
    

def loadPokeRadarData(file):
    f = open(file, 'r')
    html_doc = f.read()
    f.close()
    # refs : https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/#id5
    soup = BeautifulSoup(html_doc)
    result = {}
    for li in soup.find_all('li'):
        id = int(li.a['data-pokemon-id'])
        if not id == 0:
            name = li.a.text
            # source from : https://github.com/jnovack/pokemon-svg
            image = "http://veekun.com/dex/media/pokemon/dream-world/"+str(id)+".svg"
            #image = li.img['src']
            result[id] = {'name':name, 'image':image}
    return result
