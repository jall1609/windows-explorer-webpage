import type { Folder } from "./dto";

export function findFolderPathById(data: Folder, id_folder: number): Folder[] {
    let path: Folder[] = [];
  
    function findPath(node: Folder, pathSoFar: Folder[]): boolean {
        if (node.id === id_folder) {
            pathSoFar.push({
                id: node.id,
                name: node.name,
                parent_folder_id: node.parent_folder_id,
            });
            path = [...pathSoFar];
            return true;
        }
  
      for (const child of (node?.childrens ?? [])) {
        if (findPath(child, [...pathSoFar, {
            id: node.id,
            name: node.name,
            parent_folder_id: node.parent_folder_id,
        }])) {
            return true;
        }
      }
  
      return false; 
    }
  
    findPath(data, []);
    return path;
}

export function strLimit(text  : string, maxKarakter : number, symbol : string = ' ...') {
  return text.length > maxKarakter ? text.slice(0, maxKarakter) + symbol : text;
}
