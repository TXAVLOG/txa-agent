# Crawler Standards

## Actor and Metadata Integrity
- **Actor Linking**: Mọi nguồn crawl mới sau này (ngoài Ophim) đều phải đảm bảo ánh xạ diễn viên vào hệ thống link `actor.show` bằng cách sử dụng `Str::slug(name)`.
- **TMDB/IMDb Enrichment**: Ưu tiên crawl đầy đủ điểm số TMDB và IMDb. Định dạng hiển thị phải luôn đi kèm nhãn nguồn (Ví dụ: TMDB 10.0).
- **Font Support**: Đảm bảo dữ liệu tên diễn viên, đạo diễn (đặc biệt là tiếng Trung/Nhật/Hàn) được lưu trữ đúng định dạng UTF-8 và giao diện hiển thị sử dụng font stack hỗ trợ CJK.

## Actor Details
- Khi bổ sung nguồn crawl, nếu nguồn đó hỗ trợ API chi tiết diễn viên (bio, birthday, ảnh), phải ưu tiên cập nhật vào bảng `actors` để làm giàu dữ liệu cho trang hồ sơ diễn viên.
