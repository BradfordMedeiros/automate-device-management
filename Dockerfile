
FROM bradfordmedeiros/storkd_0.2

WORKDIR /storkd
ADD ./plugins /automate_dm

CMD ["node","index.js","-p","/automate_dm"]
