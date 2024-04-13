PORT=5434

psql -h 127.0.0.1 -p $PORT -U grietje -d grietje --password -c "select * from wallet;"