FROM nginx:1.20

COPY dist/public_html /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
