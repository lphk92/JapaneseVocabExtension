import sys

def createJavascriptList(fileName, delimeter, outputName):
    data = open(fileName, 'r')
    entries = data.readlines()
    jscript = "function generate" + outputName + "()\n{\n var list = ["
    for entry in entries:
        parts = entry.split(delimeter)
        if len(parts) == 3:
            jscript += "\n{\n\"visible\": true,\n\"kanji\":\"" + parts[0] + "\",\n\"reading\":\"" + parts[1] + "\",\n\"meaning\":\"" + parts[2].strip() + "\"\n},"

    jscript = jscript[0:len(jscript)-1]
    jscript += "];\n\nreturn list;\n}"

    fout = open(outputName + ".js", 'w')
    fout.write(jscript)
    fout.close()
    print "JavaScript written to '" + outputName + ".js'"

def main():
    if not len(sys.argv) == 4:
        print "Must have two arguments, fileName, delimeter and outputName"
        return
         
    fileName = sys.argv[1]
    delimeter = sys.argv[2]
    outputName = sys.argv[3]
    print "Your file name is -- ", fileName
    print "Your delimeter is -- ", delimeter
    print "Your output name is -- ", outputName 

    createJavascriptList(fileName, delimeter, outputName)

if __name__ == '__main__':
    main()
