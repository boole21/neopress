# docker中安装postgresql

url: <https://wwxiaoqi.com/tech/docker-build-postgresql-database/>

## 安装

```bash
docker pull postgres

docker volume list            # 列出 Docker 卷
docker volume rm pgdata       # 删除 Docker 卷

docker volume create pgdata   # 创建 Docker 卷
docker volume inspect pgdata  # 检查 Docker 卷

```

```bash
docker run -it \
 --name postgres \
 --restart always \
 -e TZ='Asia/Shanghai' \
 -e POSTGRES_PASSWORD='abc123' \
 -e ALLOW_IP_RANGE=0.0.0.0/0 \
 -v /home/postgres/data:/var/lib/postgresql \
 -p 55435:5432 \
 -d postgres

```

```bash
docker exec -it postgres bash
su postgres
psql -U postgres -W

```

```bash
create user test with password 'test';            # 创建数据库新用户
CREATE DATABASE testdb OWNER test;                # 创建用户数据库
GRANT ALL PRIVILEGES ON DATABASE testdb TO test;  # 将 testdb 数据库的所有权限都赋予 test
\q                                                # 使用命令 \q 退出 psql

```
