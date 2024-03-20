all: PutHTML

PutHTML:
	cp main.html /var/www/html/ticktack/
	cp script.js /var/www/html/ticktack/
	cp style.css /var/www/html/ticktack/



	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/ticktack/
