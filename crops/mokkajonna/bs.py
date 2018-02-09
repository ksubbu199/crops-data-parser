import locale
import codecs
import sys
from bs4 import BeautifulSoup

files = open('filenames.txt','r')
filenames = []
for i in files:
    i=i.strip()
    filenames.append(i)

for i in filenames:
    x= i + "\n\n"
    html_doc = open(i,'r')
    save = open("parsed_"+i,'w')
    soup = BeautifulSoup(html_doc, 'html.parser')
    mydivs = soup.findAll("div", { "class" : "column" })
    x = x +  soup.title.string.encode("utf-8") + "\n"

    for i in mydivs:
    	x= x+ i.encode("utf-8")

    save.write(x)


    

