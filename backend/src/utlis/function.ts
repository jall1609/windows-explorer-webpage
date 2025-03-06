import { Folder } from "src/api/folders/dto/folder.dto";

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

function findChildrenFolderById(id: number, keyword: string, folder: Folder): Folder[] {
  let result: Folder[] = [];

  if (folder.name.toLowerCase().includes(keyword.toLowerCase())) {
    result.push(folder);
  }

  if (folder.childrens && folder.childrens.length > 0) {
    folder.childrens.forEach(child => {
      result = result.concat(findChildrenFolderById(id, keyword, child));
    });
  }

  return result;
}

function findFoldersByParentId(root: Folder[], folderId: number, keyword: string): Folder[] {
  let targetFolder: Folder | null = null;

  const findTargetFolder = (folders: Folder[]) => {
    for (let folder of folders) {
      if (folder.id === folderId) {
        targetFolder = folder;
        break;
      }
      if (folder.childrens && folder.childrens.length > 0) {
        findTargetFolder(folder.childrens);
      }
    }
  };

  findTargetFolder(root);

  if (!targetFolder) {
    console.log("Folder not found.");
    return [];
  }

  return findChildrenFolderById(folderId, keyword, targetFolder);
}

function findFolderPathById(data: Folder, id_folder: number): Folder[] {
  let path: Folder[] = [];

  function findPath(node: Folder, pathSoFar: Folder[]): boolean {
      if (node.id === id_folder) {
          pathSoFar.push(node);
          path = [...pathSoFar];
          return true;
      }

    for (const child of (node?.childrens ?? [])) {
      if (findPath(child, [...pathSoFar, node])) {
          return true;
      }
    }

    return false; 
  }

  findPath(data, []);
  return path;
}

export {isNotDeleted, organizeFolders, findFoldersByParentId, findFolderPathById}