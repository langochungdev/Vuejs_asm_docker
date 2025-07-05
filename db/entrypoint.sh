#!/bin/bash

# Khởi động SQL Server ở nền
/opt/mssql/bin/sqlservr &

# Chờ SQL Server khởi động
echo "⏳ Chờ SQL Server khởi động..."
sleep 30

# Chạy init.sql
echo "🚀 Đang chạy script init.sql..."
/opt/mssql-tools/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "$SA_PASSWORD" \
  -d master \
  -b -I \
  -i /docker-entrypoint-initdb.d/init.sql


echo "✅ Đã chạy xong init.sql"

# Giữ tiến trình sqlservr sống
wait
