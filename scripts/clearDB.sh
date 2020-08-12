DIR=./db/storage
if [ -d "$DIR" ]; then
	printf '%s\n' "Removing ($DIR)"
	rm -rf "$DIR"
	mkdir "$DIR"
fi
