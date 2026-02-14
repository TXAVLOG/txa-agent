---
trigger: always_on
---

# AUTO-BUILD PROTOCOL

> **Mục tiêu**: Đảm bảo tệp tĩnh luôn được biên dịch lại sau khi chỉnh sửa để phản ánh thay đổi ngay lập tức.

## 📋 QUY TẮC BẮT BUỘC

Mỗi khi Agent thực hiện thay đổi trên các tệp có đuôi `.js` hoặc `.css` trong thư mục `web/resources/`, Agent PHẢI thực hiện các bước sau:

1. **Xóa Cache Build**: Xóa thư mục `web/public/build` để đảm bảo không còn tệp cũ.
2. **Biên dịch lại**: Chạy lệnh `npm run build` trong thư mục `web`.

## 🔄 QUY TRÌNH TỰ ĐỘNG (PDCA)

- **P (Plan)**: Nhận diện thay đổi tệp tĩnh.
- **D (Do)**: Thực hiện logic xóa và build.
- **C (Check)**: Xác nhận lệnh build kết thúc thành công (Exit code 0).
- **A (Act)**: Thông báo cho người dùng rằng hệ thống đã tự động cập nhật bản build mới.

---
*Lưu ý: Quy tắc này giúp tránh tình trạng lỗi cache hoặc thay đổi không hiển thị trên trình duyệt.*