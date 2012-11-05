import sys

def createJson(fileName, delimeter):
    data = open(fileName, 'r')
    entries = data.readlines()
    json = "\"vocabList\":["
    for entry in entries:
        parts = entry.split(delimeter)
        if len(parts) == 3:
            json += "\n{\n\"kanji\":\"" + parts[0] + "\",\n\"kana\":\"" + parts[1] + "\",\n\"meaning\":\"" + parts[2].strip() + "\"\n},"

    json = json[0:len(json)-1]
    json += "]"

    fout = open("output.json", 'w')
    fout.write(json);
    print "JSON written to 'output.json'"

def main():
    if not len(sys.argv) == 3:
        print "Must have two arguments, fileName and delimeter"
        return
         
    fileName = sys.argv[1]
    delimeter = sys.argv[2]
    print "Your file name is -- ", fileName
    print "Your delimeter is -- ", delimeter

    createJson(fileName, delimeter)

if __name__ == '__main__':
    main()
