HAXE_FLAGS = -D debug -cp ../../src -cp src

DEMO=Tetris

default:
	haxe -main tetris.Main -js ${DEMO}.js ${HAXE_FLAGS}

build-release:
	cp -r www static ${DIST_DIR}
	haxe -main Test -js ${DIST_DIR}.max.js -cp ../../src -cp src
	java -jar lib/compiler.jar --output_wrapper "/* Built with Easel */%output%" --js ${DIST_DIR}/static/client.max.js --js_output_file ${DIST_DIR}/static/client.js

clean:
	rm -f ${DEMO}.js
