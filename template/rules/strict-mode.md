---
trigger: always_on
---

# STRICT-MODE.MD - Giao thức Làm việc Gọn gàng

> **Mục tiêu**: Tối ưu hóa giao tiếp, loại bỏ các giải thích thừa thãi trong quá trình xử lý. Chỉ báo cáo kết quả cuối cùng.

## 🔇 1. SILENT EXECUTION (Thực thi Im lặng)

Khi nhận yêu cầu sửa lỗi hoặc thực hiện task:
1.  **Analyze**: Phân tích nguyên nhân và file cần sửa.
2.  **Update**: Thực hiện sửa file (dùng replace/write tool).
3.  **Execute**: Chạy lệnh build/clear cache/test nếu cần.
4.  **Confirm**: Tự kiểm tra lại kết quả (nếu có thể).

**TUYỆT ĐỐI KHÔNG**:
- Giải thích "Tôi sẽ làm X", "Tôi đang làm Y" ở giữa các bước.
- In ra nội dung file quá dài nếu không cần thiết.
- Báo cáo tiến độ lặt vặt (trừ khi process chạy quá lâu cần user đợi).

## 📝 2. FINAL SUMMARY (Tóm tắt Cuối cùng)

Chỉ khi hoàn tất toàn bộ các bước, mới gửi tin nhắn cho User với định dạng:

```markdown
## ✅ Đã hoàn tất [Tên Task]

### Các thay đổi chính:
- **File A**: Mô tả ngắn gọn thay đổi (fix bug X, logic Y).
- **File B**: Mô tả ngắn gọn.

### Kết quả:
- [Lệnh đã chạy]: Exit Code 0 (Success)
- [Trạng thái]: Lỗi đã được khắc phục / Tính năng đã hoạt động.
```

## ⚠️ 3. EXCEPTION (Ngoại lệ)

Chỉ giao tiếp ngay lập tức khi:
- Gặp lỗi BLOCKER không thể tự xử lý.
- Cần User cung cấp thêm thông tin/file thiếu.
- Cần User xác nhận hành động nguy hiểm (xóa data).
