# BlueZone
Backend for BlueZone webApp


To start Server, use command

```
$ node server/index.js
```

To run the docker database:
```
cd BlueZone/mysql-db
```
```
docker-compose up
```

To access the database:
```
sudo docker exec -it mysql-db_bluezone_1 bash
```

```
mysql -uroot -p
```

password is BLUEZONE

To copy schema into docker:

https://stackoverflow.com/questions/14684063/mysql-source-error-2

Docker Compose:

https://javabydeveloper.com/create-mysql-container-using-docker-and-docker-compose/
