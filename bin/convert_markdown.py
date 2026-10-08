import pypandoc
import os

# Xác định thư mục gốc của dự án (thư mục cha của thư mục chứa script này)
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Định nghĩa đường dẫn file input và output tương đối theo thư mục gốc
documents_dir = os.path.join(base_dir, 'documents')
markdown_file = os.path.join(documents_dir, 'demo-quick-guide.md')
output_file = os.path.join(documents_dir, 'demo-quick-guide.docx')
lua_filter = os.path.join(base_dir, 'bin', 'fix_image_width.lua')

# Chuyển đổi file markdown sang docx kèm theo đường dẫn tìm kiếm tài nguyên (ảnh)
try:
    # Sử dụng extra_args để chỉ định thư mục chứa ảnh và filter căn chỉnh ảnh
    pypandoc.convert_file(
        markdown_file, 
        'docx', 
        outputfile=output_file,
        extra_args=[
            '--resource-path', documents_dir,
            '--lua-filter', lua_filter
        ]
    )
    print(f"Đã chuyển đổi thành công: {markdown_file} -> {output_file}")
except Exception as e:
    print(f"Đã xảy ra lỗi: {e}")
    print("Vui lòng đảm bảo rằng pandoc đã được cài đặt và có trong PATH của hệ thống.")
