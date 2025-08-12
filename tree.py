import os

def generate_tree(startpath, output_file):
    # Directories to ignore
    ignore_dirs = {'.git', '__pycache__', 'node_modules', 'venv', '.vscode'}
    # Files to ignore
    ignore_files = {'.DS_Store'}

    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(startpath, topdown=True):
            # Filter out ignored directories
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f'{indent}├── {os.path.basename(root)}/\n')
            
            subindent = ' ' * 4 * (level + 1)
            for file in sorted(files):
                if file not in ignore_files:
                    f.write(f'{subindent}├── {file}\n')

if __name__ == "__main__":
    # Get the directory where the script is located
    project_path = os.path.dirname(os.path.abspath(__file__))
    output_filename = 'project_tree_py.txt'
    
    print(f"Generating directory tree for '{project_path}'...")
    generate_tree(project_path, output_filename)
    print(f"Tree saved to '{output_filename}'")