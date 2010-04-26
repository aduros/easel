HAXE_FLAGS = -D debug -cp ../../src -cp src

DEMO=Tetris

default:
	haxe -main tetris.Main -js ${DEMO}.js ${HAXE_FLAGS}

build-release:
	haxe -main tetris.Main -js ${DEMO}.max.js -cp ../../src -cp src
	java -jar lib/compiler.jar --output_wrapper "/* Built with Easel */%output%" --js ${DEMO}.max.js --js_output_file ${DEMO}.js

clean:
	rm -f ${DEMO}.js
