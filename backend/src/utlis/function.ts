const isNotDeleted =  {
    deletedAt : null
};

function organizeFolders(folders) {
    // Membuat salinan dari array folders agar tidak memodifikasi data asli
    const folderMap = {};
  
    // Menyusun folder menjadi objek berdasarkan id untuk akses yang lebih cepat
    folders.forEach(folder => {
      folder.childrens = []; // Inisialisasi properti 'childrens' kosong
      folderMap[folder.id] = folder;
    });
  
    // Menyusun relasi parent-child
    const rootFolders = [];
    folders.forEach(folder => {
      if (folder.parent_folder_id === null) {
        // Jika folder tidak memiliki parent, tambahkan ke root
        rootFolders.push(folder);
      } else {
        // Jika folder memiliki parent, masukkan ke dalam child dari parent-nya
        const parentFolder = folderMap[folder.parent_folder_id];
        if (parentFolder) {
          parentFolder.childrens.push(folder);
        }
      }
    });
  
    return rootFolders;
  }

export {isNotDeleted, organizeFolders}