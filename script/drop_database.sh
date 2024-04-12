#!/bin/bash
if [ "$(whoami)" != "postgres" ]; then
        echo "Script must be run as user: postgres"
        exit 255
fi

PORT=5434

psql -p $PORT -c "drop database grietje"
psql -p $PORT -c "create database grietje"
psql -p $PORT -c "grant all privileges on database grietje to grietje"
psql -p $PORT -c "ALTER DATABASE grietje OWNER TO grietje;"
psql -p $PORT -d grietje -c "CREATE EXTENSION IF NOT EXISTS postgis;"