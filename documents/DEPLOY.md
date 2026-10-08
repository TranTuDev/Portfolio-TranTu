# Hướng dẫn Deploy nhanh

Chạy lệnh này để tự động Build lại và Restart container:

```bash
docker build -t my-app . && \
docker rm -f my-app-prod || true && \
docker run -d --name my-app-prod -p 5173:3000 --restart always my-app
```

### Xem log
```bash
docker logs -f my-app-prod
```
